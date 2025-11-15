import React from 'react';

export default function Landing({ onNewChat }) {
  return (
    <div style={{ padding: 28 }}>
      <h2>Welcome — start a new chat</h2>

      <p style={{ color: 'var(--muted)' }}>
        Click the button to create a new conversation session.
      </p>

      <button
        className="new-chat-btn"
        onClick={onNewChat}
        style={{ marginTop: 12 }}
      >
        + New Chat
      </button>
    </div>
  );
}
