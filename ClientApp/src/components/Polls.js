import React, { Component } from 'react';
import * as api from '../api';
import Poll from './Poll';

export default class Polls extends Component {
  state = { polls: [], error: '', isLoading: true, selectedPoll: undefined };
  componentDidMount() {
    this.fetchPolls();
  }
  fetchPolls = () => {
    const userId = this.props.match.params.id;
    this.setState({ isLoading: true });
    api
      .get(`api/polls/user/${userId}`)
      .then(polls => this.setState({ polls }))
      .catch(error => this.setState({ error: error.message }))
      .then(() => this.setState({ isLoading: false }));
  };
  handleDelete = id => {
    this.setState({ isLoading: true });
    api
      .remove(`api/polls/${id}`)
      .then(() => this.fetchPolls())
      .catch(error => this.setState({ error: error.message }))
      .then(() => this.setState({ isLoading: false }));
  };
  handleShowResults = pollId => {
    this.setState({
      selectedPoll: this.state.polls.filter(p => p.id === pollId)[0],
    });
  };
  handleBack = () => {
    this.setState({
      selectedPoll: undefined,
    });
  };
  render() {
    const { polls, error, isLoading, selectedPoll } = this.state;
    return (
      <div className="mt-4">
        <h2>My Polls</h2>
        {error ? (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        ) : null}
        {isLoading ? (
          'Loading...'
        ) : selectedPoll ? (
          <div className="mt-4">
            <Poll match={{ params: { id: selectedPoll.id } }} showChart />
            <button
              type="button"
              className="btn btn-primary btn-lg mt-4"
              onClick={() => this.handleBack()}
            >
              Back
            </button>
          </div>
        ) : polls.length > 0 ? (
          <ul className="list-group mt-4" style={{ textAlign: 'left' }}>
            {polls.map(poll => (
              <div className="card mt-2" key={poll.id}>
                <h5 className="card-header">{poll.text}</h5>
                <div className="card-body">
                  <p className="card-text">
                    {`${window.location.host}/poll/${poll.id}`}
                  </p>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => this.handleDelete(poll.id)}
                  >
                    Delete
                  </button>{' '}
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => this.handleShowResults(poll.id)}
                  >
                    Show Results
                  </button>
                </div>
              </div>
            ))}
          </ul>
        ) : (
          <div className="alert alert-primary mt-4" role="alert">
            You have created no polls yet{' '}
          </div>
        )}
      </div>
    );
  }
}
