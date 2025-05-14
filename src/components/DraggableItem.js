import React from 'react';

const styles = {
  item: {
    padding: '10px',
    margin: '5px',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '5px',
    cursor: 'move',
  },
};

function DraggableItem({ task, index, status }) {
  return (
    <div style={styles.item} draggable>
      {task.title}
    </div>
  );
}

export default DraggableItem;
