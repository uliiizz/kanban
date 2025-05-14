import React, { useState } from 'react';

const styles = {
  page: {
    padding: '40px',
    backgroundColor: '#f4f7fc',
    fontFamily: 'Arial, sans-serif',
  },
  board: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px 0',
  },
  column: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    border: '1px solid #e1e1e1',
    padding: '15px',
    width: '30%',
    minHeight: '400px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  task: {
    backgroundColor: '#ffffff',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '15px',
    margin: '10px 0',
    position: 'relative',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease',
  },
  titleInput: {
    margin: '5px 0',
    padding: '10px',
    width: '100%',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '16px',
  },
  descriptionInput: {
    margin: '5px 0',
    padding: '10px',
    width: '100%',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '16px',
    resize: 'vertical',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
  deleteButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '50%',
    width: '24px',
    height: '24px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '16px',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '18px',
    padding: '10px 20px',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
  },
  taskDescription: {
    whiteSpace: 'pre-wrap',
    marginTop: '8px',
    fontSize: '14px',
    color: '#555',
  },
  editButton: {
    position: 'absolute',
    top: '10px',
    right: '40px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '5px 10px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  commentInput: {
    marginTop: '10px',
    padding: '10px',
    width: '100%',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '14px',
  },
  commentList: {
    marginTop: '10px',
    paddingLeft: '20px',
  },
  commentItem: {
    backgroundColor: '#f9f9f9',
    padding: '10px',
    marginBottom: '8px',
    borderRadius: '5px',
    fontSize: '14px',
    color: '#333',
  },
};

function KanbanBoard({ tasks, setTasks }) {
  const [newTitle, setNewTitle] = useState(""); // Стан для назви нової задачі
  const [newDescription, setNewDescription] = useState("");  // Стан для опису нової задачі
  const [isAddingTask, setIsAddingTask] = useState(false); // Стан для відображення форми додавання задачі

  // Додавання нової задачі
  const addTask = () => {
    const newTask = {
      id: Date.now().toString(),
      title: newTitle,
      description: newDescription,
      comments: [],
    };
    setTasks((prev) => ({
      ...prev,
      todo: [...prev.todo, newTask], // Додаємо нову задачу до списку 'todo'
    }));
    setNewTitle("");
    setNewDescription("");
    setIsAddingTask(false); // Закриваємо форму додавання задачі  
  };

  // Перенесення задачі між колонками
  const handleDrop = (e, targetStatus) => {
    const taskId = e.dataTransfer.getData("taskId");
    const sourceStatus = e.dataTransfer.getData("sourceStatus");
    const sourceIndex = parseInt(e.dataTransfer.getData("sourceIndex"), 10);

    const newTasks = { ...tasks };
    const sourceTasks = newTasks[sourceStatus];
    const [movedTask] = sourceTasks.splice(sourceIndex, 1); // Видаляємо задачу з початкової колонки

    newTasks[targetStatus].push(movedTask); // Додаємо задачу до нової колонки

    setTasks(newTasks); // Оновлюємо стан задач
  };

    // Видалення задачі
  const deleteTask = (status, taskId) => {
    setTasks((prev) => ({
      ...prev,
      [status]: prev[status].filter((task) => task.id !== taskId),
    }));
  };

    // Оновлення задачі
  const updateTask = (status, taskId, newTitle, newDescription) => {
    const updatedTasks = { ...tasks };
    const taskIndex = updatedTasks[status].findIndex((task) => task.id === taskId);
    updatedTasks[status][taskIndex] = {
      ...updatedTasks[status][taskIndex],
      title: newTitle,
      description: newDescription,
    };
    setTasks(updatedTasks);
  };

  // Додавання коментаря до задачі
  const addComment = (taskId, commentText) => {
    const newTasks = { ...tasks };
    Object.keys(newTasks).forEach(status => {
      newTasks[status].forEach(task => {
        if (task.id === taskId) {
          task.comments.push(commentText);
        }
      });
    });
    setTasks(newTasks);
  };

  return (
    <div style={styles.page}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Kanban Board</h2>

      {!isAddingTask && (
        <button onClick={() => setIsAddingTask(true)} style={styles.button}>
          Add Task
        </button>
      )}

      {isAddingTask && (
        <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Task title"
            style={styles.titleInput}
          />
          <textarea
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            placeholder="Task description"
            rows={4}
            style={styles.descriptionInput}
          />
          <button onClick={addTask} style={styles.button}>
            Save Task
          </button>
        </div>
      )}

      <div style={styles.board}>
        {['todo', 'doing', 'done'].map((status) => (
          <DroppableArea
            key={status}
            status={status}
            tasks={tasks[status]}
            handleDrop={handleDrop}
            deleteTask={deleteTask}
            updateTask={updateTask}
            addComment={addComment}
          />
        ))}
      </div>
    </div>
  );
}

// Компонент для кожної колонки (Todo, Doing, Done)
function DroppableArea({ status, tasks, handleDrop, deleteTask, updateTask, addComment }) {
  return (
    <div
      style={styles.column}
      onDrop={(e) => handleDrop(e, status)}
      onDragOver={(e) => e.preventDefault()}
    >
      <h3 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>
        {status.toUpperCase()}
      </h3>
      {tasks.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#777' }}>No tasks</p>
      ) : (
        tasks.map((task, index) => (
          <DraggableItem
            key={task.id}
            task={task}
            index={index}
            status={status}
            deleteTask={deleteTask}
            updateTask={updateTask}
            addComment={addComment}
          />
        ))
      )}
    </div>
  );
}

// Компонент для задач, які можна перетягувати
function DraggableItem({ task, index, status, deleteTask, updateTask, addComment }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const [newComment, setNewComment] = useState("");
 
  // Початок перетягування
  const handleDragStart = (e) => {
    e.dataTransfer.setData("taskId", task.id);
    e.dataTransfer.setData("sourceStatus", status);
    e.dataTransfer.setData("sourceIndex", index);
  };

    // Збереження змін після редагування
  const saveEdit = () => {
    updateTask(status, task.id, editedTitle, editedDescription);
    setIsEditing(false);
  };
  
  // Додавання коментаря
  const handleAddComment = () => {
    addComment(task.id, newComment);
    setNewComment("");
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      style={{ ...styles.task, cursor: 'move' }}
    >
      <button
        style={styles.deleteButton}
        onClick={() => deleteTask(status, task.id)}
      >
        ×
      </button>
      {!isEditing ? (
        <>
          <button
            style={styles.editButton}
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
          <h4 style={{ color: '#333' }}>{task.title}</h4>
          <p style={styles.taskDescription}>{task.description}</p>
        </>
      ) : (
        <>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            style={styles.titleInput}
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            style={styles.descriptionInput}
            rows={4}
          />
          <button onClick={saveEdit} style={styles.button}>
            Save
          </button>
        </>
      )}
      <div style={styles.commentList}>
        {task.comments.map((comment, index) => (
          <div key={index} style={styles.commentItem}>{comment}</div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
          style={styles.commentInput}
        />
        <button onClick={handleAddComment} style={styles.button}>
          Add Comment
        </button>
      </div>
    </div>
  );
}

export default KanbanBoard;
