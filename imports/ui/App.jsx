import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import AccountsUIWrapper from './AccountsUIWrapper';
import { Tasks } from '../api/tasks';


class App extends Component {
  static defaultTask = { text: '' }

  state = {
    task: { ...App.defaultTask },
  };

  componentDidMount() {
    const textInput = document.getElementById('text');
    if (textInput) {
      textInput.focus();
    }
  }

  onCreateTask = event => {
    event.preventDefault();
    const { text } = this.state.task;

    Tasks.insert({
      text,
      owner: Meteor.userId(),
      username: Meteor.user().username,
      createdAt: new Date()
    });

    this.setState({ task: App.defaultTask })
  };

  onFormFieldChange = event => {
    const { name, value } = event.target;

    this.setState(prev => ({
      task: { ...prev.task, [name]: value },
    }));
  };

  render() {
    const { task } = this.state;
    const { tasks, currentUser } = this.props;

    return (
      <div className="container">
        <header>
          <h1>Todo List</h1>
        </header>
        <AccountsUIWrapper />
        {currentUser &&
          <TaskForm onSubmit={this.onCreateTask} onChange={this.onFormFieldChange} task={task} />
        }
        <TaskList tasks={tasks} />
      </div>
    );
  }
}

export default withTracker(() => ({
  tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
  currentUser: Meteor.user(),
}))(App);
