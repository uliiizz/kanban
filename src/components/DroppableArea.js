import React from 'react';
import DraggableItem from './DraggableItem';

const styles = {
  column: {
    width: '30%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  },
};

function DroppableArea({ status, tasks, handleDrop }) {
  return (
    <div
      style={styles.column}
      onDrop={(e) => handleDrop(e, status)}
      onDragOver={(e) => e.preventDefault()}
    >
      <h3>{status.toUpperCase()}</h3>
      {tasks.length === 0 ? (
        <p>No tasks</p>
      ) : (
        tasks.map((task, index) => (
          <DraggableItem key={task.id} task={task} index={index} status={status} />
        ))
      )}
    </div>
  );
}

export default DroppableArea;
