import React, { Component } from 'react';

export default class PollEditor extends Component {
  render() {
    return (
      <div className="mt-4">
        <h2>New Poll</h2>
        <div class="form-group">
          <label for="pollName">Name your poll</label>
          <input
            type="text"
            class="form-control"
            id="pollName"
            placeholder="What is your favorite brand?"
          />
          <label className="mt-4">Options</label>
          <input
            type="text"
            class="form-control mt-1"
            placeholder="Microsoft"
          />
          <input type="text" class="form-control mt-1" placeholder="Aplle" />
        </div>
        <button type="button" class="btn btn-secondary btn-block">
          More Options
        </button>
        <button type="button" class="btn btn-primary btn-block">
          Submit
        </button>
      </div>
    );
  }
}
