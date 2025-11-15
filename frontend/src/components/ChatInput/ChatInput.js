import React, { useState } from 'react';
import './ChatInput.css';

export default function ChatInput({ onSend }) {
  const [text, setText] = useState('');

  function submit() {
    if (!text.trim()) return;

    onSend(text.trim());
    setText('');
  }

  function onKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  }

  return (
    <>
      <textarea
        className="textbox"
        rows={1}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={onKey}
        placeholder="Ask something..."
      />

      <button
        className="send-btn"
        onClick={submit}
      >
        Send
      </button>
    </>
  );
}
