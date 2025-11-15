import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiPlus, FiTrash2, FiChevronLeft } from 'react-icons/fi';
import './Sidebar.css';

export default function Sidebar({ sessions, onNewChat, onDeleteSession }){
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const activeId = location.pathname.startsWith('/chat/') 
    ? location.pathname.split('/chat/')[1] 
    : null;

  return (
    <aside className={collapsed ? 'sidebar collapsed' : 'sidebar'}>
      <div className="logo-row">
        <div className="logo">G</div>
        {!collapsed && <div className="brand">ChatGPT Clone</div>}
        <button 
          className="collapse-btn"
          onClick={() => setCollapsed(!collapsed)}
        >
          <FiChevronLeft />
        </button>
      </div>

      <button className="new-chat-btn" onClick={onNewChat}>
        <FiPlus />
        {!collapsed && <span>New Chat</span>}
      </button>

      <div className="sessions-list">
        {sessions.map(s => (
          <div 
            key={s.id} 
            className={activeId === s.id ? 'session-item active' : 'session-item'}
          >
            <Link to={`/chat/${s.id}`} className="session-link">
              <div className="session-title">{s.title}</div>
              <div className="session-meta">
                {new Date(s.createdAt).toLocaleString()}
              </div>
            </Link>

            {!collapsed && (
              <FiTrash2
                className="delete-icon"
                onClick={() => onDeleteSession(s.id)}
              />
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}
