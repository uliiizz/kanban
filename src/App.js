import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import KanbanBoard from './components/KanbanBoard';
import TeamPage from './components/TeamPage';
import ChatPage from './components/ChatPage';


// Вивантаження задач з localStorage
const loadTasksFromLocalStorage = () => {
  const savedTasks = localStorage.getItem('tasks');
  return savedTasks ? JSON.parse(savedTasks) : {
    todo: [],
    doing: [],
    done: []
  };
};

// Збереження задач в localStorage
const saveTasksToLocalStorage = (tasks) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

function App() {
  const [tasks, setTasks] = useState(loadTasksFromLocalStorage());

  // Зберігаємо задачі в localStorageу, коли tasks змінюються
  useEffect(() => {
    saveTasksToLocalStorage(tasks);
  }, [tasks]);

  //Навігаційна панель
  return (
    <Router>
      <div style={styles.navbar}>
        <Link to="/" style={styles.link}>Kanban</Link>
        <Link to="/team" style={styles.link}>Team</Link>
        <Link to="/chat" style={styles.link}>Chat</Link>
      </div>
      <Routes>
        <Route path="/" element={<KanbanBoard tasks={tasks} setTasks={setTasks} />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </Router>
  );
}

const styles = {
  page: {
    padding: '20px',
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-around',
    backgroundColor: '#333',
    padding: '10px',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '18px',
  }
};

export default App;