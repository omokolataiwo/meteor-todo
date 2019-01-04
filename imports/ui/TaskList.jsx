import React from 'react';
import Task from './Task';

const TaskList = ({tasks, onCompleted}) => (
  <ul>
    {tasks.map(task => (
      <Task key={task._id} task={task} />
    ))}
  </ul>
);

export default TaskList;
