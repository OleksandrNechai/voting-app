import React, { Component } from 'react';
import PollEditor from './PollEditor';

export default class Dashboard extends Component {
  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <h1>DASHBOARD</h1>
        <h4>What would you like to do today?</h4>
        <div class="btn-group btn-group-toggle" data-toggle="buttons">
          <label class="btn btn-secondary btn-lg active">
            <input
              type="radio"
              name="options"
              id="option1"
              autocomplete="off"
              checked
            />{' '}
            New Poll
          </label>
          <label class="btn btn-lg btn-secondary">
            <input
              type="radio"
              name="options"
              id="option2"
              autocomplete="off"
            />{' '}
            My Polls
          </label>
        </div>
        <PollEditor />
      </div>
    );
  }
}
