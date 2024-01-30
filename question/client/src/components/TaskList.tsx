// frontend/src/components/TaskList.tsx
import React from 'react';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: {
    id: number;
    name: string;
    completed: boolean;
  }[];
  onUpdate: (taskId: number, newName: string, completed: boolean) => void;
  onDelete: (taskId: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onUpdate, onDelete }) => {
  if (tasks.length === 0) {
    return (
      <div>
        <img
          src="https://t4.ftcdn.net/jpg/04/72/65/73/360_F_472657366_6kV9ztFQ3OkIuBCkjjL8qPmqnuagktXU.jpg"
          alt=""
          style={{ width: 200, height: 150, marginLeft: 200 }}
        />
      </div>
    );
  }

  return (
    <ul style={{ width: '100%' }}>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </ul>
  );
};

export default TaskList;
