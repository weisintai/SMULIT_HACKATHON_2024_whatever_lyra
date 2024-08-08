import React, { useState } from 'react';

const ChatLog = () => {
  const [chatMessage, setChatMessage] = useState('');
  const [dataProtection, setDataProtection] = useState(false);

  const handleInputChange = (event) => {
    setChatMessage(event.target.value);
  };

  const handleDataProtectionToggle = () => {
    setDataProtection(!dataProtection);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/chat-log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: chatMessage,
          dataProtection,
        }),
      });

      if (response.ok) {
        // Chat log submission successful, handle the response as needed
        console.log('Chat log submitted successfully!');
        setChatMessage('');
      } else {
        // Chat log submission failed, handle the error
        console.error('Chat log submission failed:', await response.json());
      }
    } catch (error) {
      console.error('Error during chat log submission:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <textarea
          value={chatMessage}
          onChange={handleInputChange}
          placeholder="Enter your message..."
        ></textarea>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={dataProtection}
            onChange={handleDataProtectionToggle}
          />
          Data Protection
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ChatLog;