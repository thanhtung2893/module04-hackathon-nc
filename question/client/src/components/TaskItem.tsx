import React, { useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';

interface TaskItemProps {
  task: {
    id: number;
    name: string;
    completed: boolean;
  };
  onUpdate: (taskId: number, newName: string, completed: boolean) => void;
  onDelete: (taskId: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onUpdate, onDelete }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedName, setEditedName] = useState(task.name);

  const handleUpdateClick = () => {
    onUpdate(task.id, editedName, task.completed);
    setEditMode(false);
  };

  return (
    <li>
      {editMode ? (
        <>
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
          <button onClick={handleUpdateClick}>Update</button>
        </>
      ) : (
        <>
          <div className="item-1">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onUpdate(task.id, task.name, !task.completed)}
            />
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
              {task.name}
            </span>
          </div>
          <div className="item-2">
            <button onClick={() => setEditMode(true)}><MdEdit /></button>
            <button className="delete" onClick={() => onDelete(task.id)}><MdDelete /></button>
          </div>
        </>
      )}
    </li>
  );
};

export default TaskItem;
