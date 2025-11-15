import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import ChatWindow from './components/ChatWindow/ChatWindow';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';
import Landing from './components/Landing/Landing';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import './index.css';

function AppShell() {
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSessions();
  }, []);

  async function fetchSessions() {
    try {
      const res = await fetch('http://localhost:5000/api/sessions');
      const data = await res.json();
      setSessions(data);
    } catch (e) {
      console.error(e);
    }
  }

  async function handleNewChat() {
    try {
      const res = await fetch('http://localhost:5000/api/new-chat');
      const data = await res.json();
      await fetchSessions();
      navigate(`/chat/${data.id}`);
    } catch (e) {
      alert('Cannot create chat');
    }
  }

  async function handleDeleteSession(id) {
    try {
      await fetch(`http://localhost:5000/api/session/${id}`, { method: 'DELETE' });
      await fetchSessions();

      const current = window.location.pathname;
      if (current === `/chat/${id}`) {
        navigate('/');
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="app">
      <Sidebar
        sessions={sessions}
        onNewChat={handleNewChat}
        onDeleteSession={handleDeleteSession}
      />

      <main className="main">
        <header className="header">
          <div className="title">ChatGPT Clone</div>
          <div>
            <ThemeToggle />
          </div>
        </header>

        <div className="chat-area">
          <Routes>
            <Route path="/" element={<Landing onNewChat={handleNewChat} />} />
            <Route path="/chat/:id" element={<ChatWindow />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
