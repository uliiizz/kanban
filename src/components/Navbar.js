import React from 'react';
import { Link } from 'react-router-dom';

const styles = {
    page: {
      padding: '20px',
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
    },
    input: {
      padding: '10px',
      marginBottom: '10px',
    },
    board: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    column: {
      width: '30%',
      padding: '10px',
      border: '1px solid #ddd',
    },
    task: {
      backgroundColor: '#f4f4f4',
      padding: '10px',
      marginBottom: '10px',
      borderRadius: '5px',
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
    },
  };
  
function Navbar() {
  return (
    <div style={styles.navbar}>
      <Link to="/" style={styles.link}>Kanban</Link>
      <Link to="/team" style={styles.link}>Team</Link>
      <Link to="/chat" style={styles.link}>Chat</Link>
    </div>
  );
}

export default Navbar;
