# ChatGPT Clone

A simple ChatGPT-style conversational app built with React and Node.js. Start multiple chat sessions, switch between them, view previous conversations, and receive structured AI responses in table format.

[Frontend Live Demo](https://your-frontend-demo-link.com)  
[Backend API Demo](https://your-backend-demo-link.com)

## Features

- Start new chats and view session history
- Delete sessions with persistence
- Structured AI responses (tables)
- Like/Dislike feedback
- Dark/Light theme with localStorage
- Responsive ChatGPT-inspired UI
- File-based mock JSON storage (no database)

## Tech Stack

**Frontend:** React.js, React Router DOM, CSS3, React Icons  
**Backend:** Node.js, Express.js, CORS, JSON file storage

## Installation & Setup

1. **Clone the repository:**

```bash
git clone https://github.com/your-username/chatgpt-clone.git
cd chatgpt-clone
```

2. **Install & start backend:**

```bash
   cd backend
   npm install
   npm start
```

Backend runs at: http://localhost:5000

3. **Install & start frontend:**

```bash
   cd frontend
   npm install
   npm start
```

Frontend runs at: http://localhost:3000

## Usage

- **New Chat:** Click "New Chat" to create a session.  
- **Chat:** Type messages; backend returns structured responses.  
- **Sessions:** View, switch, or delete sessions.  
- **Theme:** Toggle 🌞 / 🌙 (saved in localStorage).  

## Routes

| Route        | Description                       |
|--------------|-----------------------------------|
| `/`          | Landing page                       |
| `/chat/:id`  | Chat interface for a session       |

## Data Storage

All data is stored in `backend/mockData.json`:

- **Session ID, title, timestamp**  
- **Full message history**  
- **AI responses (tables)**  
- **Like/Dislike feedback**  

The file updates automatically on:

- New chats  
- Sending messages  
- Giving feedback  
- Deleting sessions  

## Highlights

- Clean, modular React + Node.js project  
- ChatGPT-inspired UI  
- Dark/Light theme  
- Persistent session storage without DB  
- Beginner-friendly and easy to extend  

## Author

Beeraka Satya Venkata Divya Lakshmi
