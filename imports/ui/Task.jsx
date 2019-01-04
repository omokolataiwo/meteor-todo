import React from 'react';
import {Tasks} from '../api/tasks';

export default ({ task }) => {
  const updateCompleted = () => {
    Tasks.update(task._id, { $set: { completed: !task.completed } });
  }
  const deleteTask = () => {
    Tasks.remove(task._id);
  }
  const completedClass = task.completed ? 'completed' : '';
  return (
    <li className={completedClass}>
      <input type="checkbox" onClick={updateCompleted} />
      {task.text}{' '}
      <button className="btn" onClick={deleteTask}>
        &times;
      </button>
    </li>
  );
};
