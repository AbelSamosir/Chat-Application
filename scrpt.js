document.addEventListener('DOMContentLoaded', function () {
  const TheekshithaSelectorBtn = document.querySelector('#Theekshitha-selector');
  const TeacherSelectorBtn = document.querySelector('#Teacher-selector');
  const chatHeader = document.querySelector('.chat-header');
  const chatMessages = document.querySelector('.chat-messages');
  const chatInputForm = document.querySelector('.chat-input-form');
  const chatInput = document.querySelector('.chat-input');
  const clearChatBtn = document.querySelector('.clear-chat-button');

  const messages = JSON.parse(localStorage.getItem('messages')) || [];

  const createChatMessageElement = (message) => `
    <div class="message ${message.sender === 'Theekshitha' ? 'green-bg' : 'blue-bg'}">
      <div class="message-sender">${message.sender}</div>
      <div class="message-text">${message.text}</div>
      <div class="message-timestamp">${message.timestamp}</div>
    </div>
  `;

  // Declare the 'active,' 'statusBar,' 'callBar,' 'chatCallStatus,' and 'chartBar' variables within the window.onload function
  let active;
  let statusBar;
  let callBar;
  let chatCallStatus;
  let chartBar;

  // Function to change the active tab
  function changeTab(index) {
    for (var i = 0; i < 3; i++)
      active[i].classList.remove('active-select-menu');
    active[index - 1].classList.add('active-select-menu');
    if (index == 1) {
      statusBar.remove();
      callBar.remove();
      chatCallStatus.appendChild(chartBar);
    } else if (index == 2) {
      chartBar.remove();
      callBar.remove();
      chatCallStatus.appendChild(statusBar);
    } else if (index == 3) {
      chartBar.remove();
      statusBar.remove();
      chatCallStatus.appendChild(callBar);
    }
    console.log(`Tab ${index} clicked.`);
  }

  window.onload = function () {
    setTimeout(() => {
      document.querySelector('body').style.opacity = '1';
    }, 500);

    let menuBar;
    let fixedMenu;

    menuBar = document.querySelector('.menu-bar');
    fixedMenu = menuBar.offsetTop;
    statusBar = document.querySelector('.status-container');
    callBar = document.querySelector('.call-container');
    chartBar = document.querySelector('.chat-container'); // Define 'chartBar' here
    active = document.getElementsByClassName('menu-bar__list-item');
    chatCallStatus = document.querySelector('.chat-status-call');
    statusBar.remove();
    callBar.remove();
    changeTab(1);

    window.onscroll = function () {
      if (window.pageYOffset >= fixedMenu) {
        menuBar.classList.add("fixed-menu");
      } else {
        menuBar.classList.remove("fixed-menu");
      }
    }

    // Add the event listener for the "Status" tab
    const statusTab = document.querySelector('.menu-bar__list-item:nth-child(2)');
    statusTab.onclick = () => changeTab(2);

    // Add event listeners for the "Chat" and "Calls" tabs
    const chatTab = document.querySelector('.menu-bar__list-item:nth-child(1)');
    chatTab.onclick = () => changeTab(1);

    const callsTab = document.querySelector('.menu-bar__list-item:nth-child(3)');
    callsTab.onclick = () => changeTab(3);
  };

  let messageSender = 'Theekshitha';

  const updateMessageSender = (name) => {
    messageSender = name;
    chatHeader.innerText = `${messageSender} chatting...`;
    chatInput.placeholder = `Type here, ${messageSender}...`;

    if (name === 'Theekshitha') {
      TheekshithaSelectorBtn.classList.add('active-person');
      TeacherSelectorBtn.classList.remove('active-person');
    }
    if (name === 'Teacher') {
      TeacherSelectorBtn.classList.add('active-person');
      TheekshithaSelectorBtn.classList.remove('active-person');
    }

    /* auto-focus the input field */
    chatInput.focus();
  };

  TheekshithaSelectorBtn.onclick = () => updateMessageSender('Theekshitha');
  TeacherSelectorBtn.onclick = () => updateMessageSender('Teacher');

  const sendMessage = (e) => {
    e.preventDefault();

    const timestamp = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    const message = {
      sender: messageSender,
      text: chatInput.value,
      timestamp,
    };

    /* Save message to local storage */
    messages.push(message);
    localStorage.setItem('messages', JSON.stringify(messages));

    /* Add message to DOM */
    chatMessages.innerHTML += createChatMessageElement(message);

    /* Clear input field */
    chatInputForm.reset();

    /* Scroll to the bottom of chat messages */
    chatMessages.scrollTop = chatMessages.scrollHeight;
  };

  chatInputForm.addEventListener('submit', sendMessage);

  clearChatBtn.addEventListener('click', () => {
    localStorage.clear();
    chatMessages.innerHTML = '';
  });
});