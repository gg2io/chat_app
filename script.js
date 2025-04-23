// 1. DATA MODEL
const conversations = {
    Francis:  [],
    George:   [],
    Luke: [
      { sender: 'Luke', text: 'morning' },
      { sender: 'You',  text: 'morning, I need to talk about the new server drives' },
      { sender: 'Luke', text: 'the nvmes for the server?' },
      { sender: 'You',  text: 'yes' },
      { sender: 'Luke', text: 'schedule a meeting after stand-up' },
    ],
    Mark:     [],
    Sam:      [],
    Zephan:   []
  };
  
  let currentUser = 'Luke'; // default selection
  
  // 2. DOM REFS
  const userListEl   = document.getElementById('userList');
  const messagesEl   = document.getElementById('messages');
  const inputEl      = document.getElementById('messageInput');
  const sendBtnEl    = document.getElementById('sendBtn');
  
  // 3. INITIALIZE USER LIST
  function renderUserList() {
    userListEl.innerHTML = '';
    Object.keys(conversations).forEach(user => {
      const div = document.createElement('div');
      div.textContent = user;
      div.classList.add('user');
      if (user === currentUser) div.classList.add('selected');
      div.addEventListener('click', () => {
        currentUser = user;
        inputEl.value = '';          // clear draft
        renderUserList();
        renderMessages();
      });
      userListEl.appendChild(div);
    });
  }
  
  // 4. RENDER MESSAGES
  function renderMessages() {
    messagesEl.innerHTML = '';
    conversations[currentUser].forEach(msg => {
      const div = document.createElement('div');
      div.classList.add('message', msg.sender === 'You' ? 'sent' : 'received');
      div.innerHTML = `<strong>${msg.sender}:</strong> ${msg.text}`;
      messagesEl.appendChild(div);
    });
    // scroll to bottom
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }
  
  // 5. HANDLE SENDING
  function sendMessage() {
    const text = inputEl.value.trim();
    if (!text) return;
    conversations[currentUser].push({ sender: 'You', text });
    inputEl.value = '';
    renderMessages();
  }
  
  // 6. EVENT LISTENERS
  sendBtnEl.addEventListener('click', sendMessage);
  inputEl.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });
  
  // 7. BOOTSTRAP
  renderUserList();
  renderMessages();
  