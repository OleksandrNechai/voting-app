import React, { Component } from 'react';
import * as api from '../api';

export default class Poll extends Component {
  state = { error: '', poll: undefined, userName: '', voted: false };
  componentDidMount() {
    this.fetchPoll();
  }

  fetchPoll = () => {
    const id = this.props.match.params.id;
    api
      .get(`api/polls/${id}`)
      .then(poll => {
        this.setState({ poll });
        api
          .get(`api/users/${poll.userId}`)
          .then(user => this.setState({ userName: user.name }))
          .catch(error => this.setState({ error: error.message }));
      })
      .catch(error => this.setState({ error: error.message }));
  };

  handleVote = optionId => {
    api
      .put(`api/polls/${this.state.poll.id}/${optionId}`)
      .then(() => {
        this.setState({ voted: true });
        this.fetchPoll();
      })
      .catch(error => this.setState({ error: error.message }));
  };

  render() {
    const { poll, error, userName, voted } = this.state;
    return (
      <div className="mt-4" style={{ textAlign: 'center' }}>
        {error ? (
          <div className="alert alert-danger mt-4" role="alert">
            {error}
          </div>
        ) : null}
        {poll ? (
          voted ? (
            <div>
              <h1>{poll.text}</h1>
              {poll.options.map(option => (
                <div key={option.id}>
                  {option.text} ({option.votesCount})
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-4">
              <h1>{poll.text}</h1>
              <div
                className="btn-group btn-group-lg btn-group-vertical mt-4"
                role="group"
                aria-label="Basic example"
              >
                {poll.options.map(option => (
                  <button
                    key={option.id}
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => this.handleVote(option.id)}
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            </div>
          )
        ) : null}
        {userName ? <h4 className="mt-4">By {userName}</h4> : null}
      </div>
    );
  }
}
