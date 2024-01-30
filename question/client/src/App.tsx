// frontend/src/App.tsx
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList';
import { FaCheck } from 'react-icons/fa';
import './App.css';

interface Task {
  id: number;
  name: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskName, setNewTaskName] = useState<string>('');
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get<Task[]>('http://localhost:7000/api/v1/task');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const completedTasks = tasks.filter((task) => task.completed);

  const addTask = async () => {
    if (newTaskName.trim() === '') {
      alert('Hãy nhập vào tên công việc');
      return;
    }

    try {
      const response = await axios.post<Task>('http://localhost:7000/api/v1/task', {
        name: newTaskName,
        completed: false,
      });

      const newTask = response.data;
      setTasks([...tasks, newTask]);
      setNewTaskName('');
      ref.current?.focus();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const updateTask = async (taskId: number, newName: string, completed: boolean) => {
    try {
      await axios.put(`http://localhost:7000/api/v1/task/${taskId}`, {
        name: newName,
        completed,
      });

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, name: newName, completed } : task
        )
      );
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (taskId: number) => {
    try {
      await axios.delete(`http://localhost:7000/api/v1/task/${taskId}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      ref.current?.focus();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="container">
      <h2>Danh sách công việc</h2>
      <div className="input-form">
        <input
          type="text"
          id="taskInput"
          placeholder="Thêm công việc"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
          ref={ref}
        />

        <button style={{ backgroundColor: 'blue' }} onClick={addTask}>
          Thêm
        </button>
      </div>
      <TaskList tasks={tasks} onUpdate={updateTask} onDelete={deleteTask} />

      {tasks.length === 0 ? (
        <div style={{ textAlign: 'center', fontWeight: 'bold', backgroundColor: 'whitesmoke', color: 'black', padding: '10px' }}>
          Bạn không có công việc nào!!!
        </div>
      ) : (
        <div style={{ textAlign: 'center', fontWeight: 'bold', backgroundColor: 'whitesmoke', color: 'black', padding: '10px' }}>
          {completedTasks.length !== tasks.length ? (
            `Số công việc đã hoàn thành: ${completedTasks.length}/${tasks.length}`
          ) : (
            <div>
              {' '}
              <FaCheck style={{ color: 'green', marginRight: '5px' }} /> Đã hoàn thành tất cả các công việc
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
