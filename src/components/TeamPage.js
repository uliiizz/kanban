import React, { useState, useEffect } from 'react';

const TEAM_STORAGE_KEY = 'teamMembers';

const saveTeamToLocalStorage = (team) => {
  localStorage.setItem(TEAM_STORAGE_KEY, JSON.stringify(team));
};

const loadTeamFromLocalStorage = () => {
  const saved = localStorage.getItem(TEAM_STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
};

const styles = {
  page: {
    padding: '20px',
    backgroundColor: '#f4f7fa',
    fontFamily: 'Arial, sans-serif',
  },
  teamHeader: {
    fontSize: '32px',
    marginBottom: '20px',
    color: '#333',
    textAlign: 'center',
  },
  inputContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    width: '300px',
    marginRight: '10px',
    transition: 'border-color 0.3s ease',
  },
  inputFocus: {
    borderColor: '#4CAF50',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  teamList: {
    listStyleType: 'none',
    padding: 0,
    marginTop: '20px',
  },
  teamMember: {
    padding: '12px 15px',
    marginBottom: '10px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '18px',
    color: '#333',
    transition: 'background-color 0.3s ease',
  },
  removeButton: {
    padding: '6px 12px',
    fontSize: '14px',
    backgroundColor: '#e53935',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  noMembersMessage: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#777',
  },
};

function TeamPage() {
  const [members, setMembers] = useState(loadTeamFromLocalStorage);
  const [newMember, setNewMember] = useState('');
  const [inputFocus, setInputFocus] = useState(false);

  useEffect(() => {
    saveTeamToLocalStorage(members);
  }, [members]);

  const addMember = () => {
    if (newMember.trim() !== '') {
      setMembers((prevMembers) => [...prevMembers, newMember]);
      setNewMember('');
    }
  };

  const removeMember = (member) => {
    setMembers((prevMembers) => prevMembers.filter((m) => m !== member));
  };

  return (
    <div style={styles.page}>
      <h2 style={styles.teamHeader}>Team Members</h2>

      <div style={styles.inputContainer}>
        <input
          type="text"
          value={newMember}
          onChange={(e) => setNewMember(e.target.value)}
          onFocus={() => setInputFocus(true)}
          onBlur={() => setInputFocus(false)}
          placeholder="Add a new member"
          style={{
            ...styles.input,
            ...(inputFocus ? styles.inputFocus : {}),
          }}
        />
        <button
          onClick={addMember}
          style={styles.button}
        >
          Add Member
        </button>
      </div>

      {members.length === 0 ? (
        <p style={styles.noMembersMessage}>No team members added yet.</p>
      ) : (
        <ul style={styles.teamList}>
          {members.map((member, index) => (
            <li
              key={index}
              style={styles.teamMember}
            >
              <span>{member}</span>
              <button
                onClick={() => removeMember(member)}
                style={styles.removeButton}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TeamPage;
