import React from 'react';
import './AnswerFeedback.css';

export default function AnswerFeedback({ feedback, onChange }) {

  function handle(type) {
    if (!onChange) return;

    if (feedback === type) {
      onChange(null);
    } else {
      onChange(type);
    }
  }

  return (
    <div className="fb">
      <button
        className={feedback === 'like' ? 'fb-btn active' : 'fb-btn'}
        onClick={() => handle('like')}
      >
        👍
      </button>

      <button
        className={feedback === 'dislike' ? 'fb-btn active' : 'fb-btn'}
        onClick={() => handle('dislike')}
      >
        👎
      </button>
    </div>
  );
}
