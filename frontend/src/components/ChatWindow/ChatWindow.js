import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import ChatInput from '../ChatInput/ChatInput';
import TableResponse from '../TableResponse/TableResponse';
import AnswerFeedback from '../AnswerFeedback/AnswerFeedback';

import './ChatWindow.css';

export default function ChatWindow() {
  const { id } = useParams();
  const [session, setSession] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    if (!id) return;

    loadSession();
    const interval = setInterval(loadSession, 3000);

    return () => clearInterval(interval);
  }, [id]);

  async function loadSession() {
    try {
      const res = await fetch(`https://chatgpt-clone-five-delta.vercel.app/api/session/${id}`);

      if (!res.ok) {
        throw new Error('not found');
      }

      const data = await res.json();
      setSession(data);

      setTimeout(() => {
        if (ref.current) {
          ref.current.scrollTop = ref.current.scrollHeight;
        }
      }, 100);

    } catch (e) {
      setSession(null);
    }
  }

  async function handleSend(question) {
    try {
      await fetch(
        `https://chatgpt-clone-five-delta.vercel.app/api/chat/${id}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ question })
        }
      );

      await loadSession();

    } catch (e) {
      alert('Send failed');
    }
  }

  async function handleFeedback(index, feedback) {
    try {
      await fetch(
        `https://chatgpt-clone-five-delta.vercel.app/api/feedback/${id}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ index, feedback })
        }
      );

      await loadSession();

    } catch (e) {
      console.error(e);
    }
  }

  if (!id) {
    return (
      <div style={{ padding: 20 }}>
        Select or create a chat
      </div>
    );
  }

  if (!session) {
    return (
      <div style={{ padding: 20 }}>
        Loading...
      </div>
    );
  }

  return (
    <>
      <div
        style={{
          padding: 16,
          borderBottom: '1px solid var(--table-border)',
          background: 'var(--panel)'
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: 12,
            alignItems: 'center'
          }}
        >
          <h3 style={{ margin: 0 }}>
            {session.title}
          </h3>

          <div style={{ color: 'var(--muted)' }}>
            {new Date(session.createdAt).toLocaleString()}
          </div>
        </div>
      </div>

      <div className="messages" ref={ref}>
        {session.history.length === 0 && (
          <div
            style={{
              padding: 20,
              color: 'var(--muted)'
            }}
          >
            No messages yet. Ask something below.
          </div>
        )}

        {session.history.map((item, idx) => (
          <div key={idx} style={{ marginBottom: 18 }}>
            <div
              className="msg-row msg-user"
              style={{ justifyContent: 'flex-end' }}
            >
              <div className="bubble user">
                {item.question}
              </div>
            </div>

            <div className="msg-row">
              <div className="msg-avatar">
                AI
              </div>

              <div>
                <div className="bubble ai">
                  <div>{item.answer.description}</div>
                  <TableResponse table={item.answer.table} />
                </div>

                <div className="feedback">
                  <AnswerFeedback
                    feedback={item.feedback}
                    onChange={(fb) => handleFeedback(idx, fb)}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="input-area">
        <ChatInput onSend={handleSend} />
      </div>
    </>
  );
}
