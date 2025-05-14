import React, { useState, useEffect } from 'react';

const CHAT_STORAGE_KEY = 'chatMessages';

const saveChatToLocalStorage = (messages) => {
  localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
};

const loadChatFromLocalStorage = () => {
  const saved = localStorage.getItem(CHAT_STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
};

const styles = {
  page: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f4f7fa',
    fontFamily: 'Arial, sans-serif',
    margin: 0,
  },
  chatBox: {
    backgroundColor: '#fff',
    width: '100%',
    maxWidth: '600px', // Ограничение максимальной ширины окна чата
    height: '80%', // Ограничиваем высоту, чтобы чат не заполнял весь экран
    borderRadius: '16px',
    padding: '20px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  header: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  messageContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    maxHeight: '70%', // Чтобы сообщения занимали большую часть окна
    overflowY: 'auto',
  },
  message: {
    alignSelf: 'flex-start',
    padding: '12px 18px',
    backgroundColor: '#f1f1f1',
    borderRadius: '18px 18px 18px 4px',
    maxWidth: '80%',
    wordWrap: 'break-word',
    fontSize: '16px',
    color: '#333',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#4CAF50',
    color: '#fff',
    borderRadius: '18px 18px 4px 18px',
  },
  inputContainer: {
    display: 'flex',
    gap: '10px',
    marginTop: '10px',
    justifyContent: 'center', // Центрируем элементы ввода
  },
  input: {
    flex: 1,
    padding: '12px 16px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '12px',
    outline: 'none',
    transition: 'border-color 0.3s',
  },
  button: {
    padding: '12px 20px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#43a047',
  },
  noMessages: {
    textAlign: 'center',
    color: '#888',
    fontSize: '16px',
  },
};

function ChatPage() {
  const [messages, setMessages] = useState(loadChatFromLocalStorage());
  const [newMessage, setNewMessage] = useState('');
  const [hover, setHover] = useState(false);

  useEffect(() => {
    saveChatToLocalStorage(messages);
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages((prev) => [...prev, { text: newMessage.trim(), fromUser: true }]);
      setNewMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.chatBox}>
        <div style={styles.header}>💬 Team Chat</div>

        <div style={styles.messageContainer}>
          {messages.length === 0 ? (
            <div style={styles.noMessages}>No messages yet.</div>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  ...styles.message,
                  ...(msg.fromUser ? styles.userMessage : {}),
                }}
              >
                {msg.text}
              </div>
            ))
          )}
        </div>

        <div style={styles.inputContainer}>
          <input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            style={styles.input}
          />
          <button
            onClick={sendMessage}
            style={{
              ...styles.button,
              ...(hover ? styles.buttonHover : {}),
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
