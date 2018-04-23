import React, { Component } from 'react';
import PollEditor from './PollEditor';
import { Route, Switch, Redirect } from 'react-router';
import Polls from './Polls';

export default class Dashboard extends Component {
  isNewPolView = () => {
    return this.props.location.pathname.includes('new-poll');
  };
  handlePollsClick = () => {
    this.props.history.push(`${this.props.match.url}/polls`);
  };
  handleNewPollClick = () => {
    this.props.history.push(`${this.props.match.url}/new-poll`);
  };
  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <h1>DASHBOARD</h1>
        <h4>What would you like to do today?</h4>
        <div className="btn-group btn-group-toggle" data-toggle="buttons">
          <label
            className={`btn btn-secondary btn-lg ${
              this.isNewPolView() ? 'active' : ''
            }`}
            onClick={this.handleNewPollClick}
          >
            <input type="radio" name="options" id="option1" /> New Poll
          </label>
          <label
            className={`btn btn-secondary btn-lg ${
              !this.isNewPolView() ? 'active' : ''
            }`}
            onClick={this.handlePollsClick}
          >
            <input type="radio" name="options" id="option2" /> My Polls
          </label>
        </div>
        <Switch>
          <Route
            exact
            path={`${this.props.match.path}/new-poll`}
            component={PollEditor}
          />
          <Route
            exact
            path={`${this.props.match.path}/polls`}
            component={Polls}
          />
          <Redirect to={`${this.props.match.url}/new-poll`} />
        </Switch>
      </div>
    );
  }
}
