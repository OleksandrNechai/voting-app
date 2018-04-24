import React, { Component } from 'react';
import * as api from '../api';
import ReactChartkick, { ColumnChart } from 'react-chartkick';
import Chart from 'chart.js';
ReactChartkick.addAdapter(Chart);

export default class Poll extends Component {
  state = {
    error: '',
    poll: undefined,
    userName: '',
    voted: this.props.showChart,
  };

  componentDidMount() {
    this.fetchPoll();
    this.interval = setInterval(() => this.fetchPoll(), 2000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  fetchPoll = () => {
    const id = this.props.match.params.id;
    api
      .get(`api/polls/${id}`)
      .then(poll => {
        this.setState({ poll });
        if (!this.state.userName) {
          api
            .get(`api/users/${poll.userId}`)
            .then(user => this.setState({ userName: user.name }))
            .catch(error => this.setState({ error: error.message }));
        }
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
              <ColumnChart
                data={poll.options.map(option => [
                  option.text,
                  option.votesCount,
                ])}
              />
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
