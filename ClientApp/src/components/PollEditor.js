import React, { Component } from 'react';
import * as api from '../api';

export default class PollEditor extends Component {
  initialState = {
    text: '',
    options: [
      { id: 1, text: '', placeholder: 'Microsoft' },
      { id: 2, text: '', placeholder: 'Apple' },
    ],
    error: '',
    savedPollUrl: '',
  };

  state = this.initialState;

  handleMoreOptions = () => {
    const id = Math.max(...this.state.options.map(o => o.id)) + 1;
    this.setState({
      options: [
        ...this.state.options,
        { id, text: '', placeholder: `Option ${id}` },
      ],
    });
  };

  handleOptionChange = (id, value) => {
    this.setState({
      options: this.state.options.map(
        o => (o.id === id ? { ...o, text: value } : o)
      ),
    });
  };

  handleSubmit = () => {
    const { text, options } = this.state;
    api
      .post('api/polls', {
        text,
        userId: this.props.match.params.id,
        options: options.map(o => ({
          text: o.text,
        })),
      })
      .then(savedPoll =>
        this.setState({
          savedPollUrl: `${window.location.host}/poll/${savedPoll.id}`,
        })
      )
      .catch(error => this.setState({ error: error.message }));
  };

  render() {
    if (this.state.savedPollUrl)
      return (
        <div className="mt-4">
          <div className="alert alert-success" role="alert">
            Your poll is saved! Access it here: {this.state.savedPollUrl}
          </div>
          <button
            type="button"
            className="btn btn-primary btn-block"
            onClick={() => this.setState(this.initialState)}
          >
            OK
          </button>
        </div>
      );
    else
      return (
        <div className="mt-4">
          <h2>New Poll</h2>
          {this.state.error ? (
            <div className="alert alert-danger" role="alert">
              {this.state.error}
            </div>
          ) : null}
          <div className="form-group">
            <label htmlFor="pollName">Name your poll</label>
            <input
              type="text"
              className="form-control"
              id="pollName"
              placeholder="What is your favorite brand?"
              value={this.state.text}
              onChange={e => this.setState({ text: e.currentTarget.value })}
            />
            <label className="mt-4">Options</label>
            {this.state.options.map(option => (
              <input
                key={option.id}
                type="text"
                className="form-control mt-1"
                value={option.value}
                placeholder={option.placeholder}
                onChange={e =>
                  this.handleOptionChange(option.id, e.currentTarget.value)
                }
              />
            ))}
          </div>
          <button
            type="button"
            className="btn btn-secondary btn-block"
            onClick={this.handleMoreOptions}
          >
            More Options
          </button>
          <button
            type="button"
            className="btn btn-primary btn-block"
            onClick={this.handleSubmit}
          >
            Submit
          </button>
        </div>
      );
  }
}
