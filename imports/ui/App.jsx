import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import TaskList from './TaskList';
import { Tasks } from '../api/tasks';
import TaskForm from './TaskForm';

class App extends Component {
  static defaultTask = { text: '' }
  
  state = {
    task: { ...App.defaultTask },
  };

  componentDidMount() {
    document.getElementById('text').focus();
  }

  onCreateTask = event => {
    event.preventDefault();
    const { text } = this.state.task;

    Tasks.insert({ text, createdAt: new Date() });
    this.setState({task: App.defaultTask})
  };

  onFormFieldChange = event => {
    const { name, value } = event.target;

    this.setState(prev => ({
      task: { ...prev.task, [name]: value },
    }));
  };

  render() {
    const { task } = this.state;
    const { tasks } = this.props;

    return (
      <div className="container">
        <header>
          <h1>Todo List</h1>
        </header>
        <TaskForm onSubmit={this.onCreateTask} onChange={this.onFormFieldChange} task={task} />
        <TaskList tasks={tasks} />
      </div>
    );
  }
}

export default withTracker(() => ({
  tasks: Tasks.find({}, {sort: { createdAt: -1 }}).fetch(),
}))(App);
