import React from 'react';

const TaskForm = ({ onSubmit, task, onChange }) => (
  <form onSubmit={onSubmit}>
    <input type="text" value={task.text} onChange={onChange} name="text" id="text" />
    <button>Create Task</button>
  </form>
);

export default TaskForm;
