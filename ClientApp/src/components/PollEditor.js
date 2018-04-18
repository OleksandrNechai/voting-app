import React, { Component } from 'react';

export default class PollEditor extends Component {
  render() {
    return (
      <div className="mt-4">
        <h2>New Poll</h2>
        <div className="form-group">
          <label htmlFor="pollName">Name your poll</label>
          <input
            type="text"
            className="form-control"
            id="pollName"
            placeholder="What is your favorite brand?"
          />
          <label className="mt-4">Options</label>
          <input
            type="text"
            className="form-control mt-1"
            placeholder="Microsoft"
          />
          <input
            type="text"
            className="form-control mt-1"
            placeholder="Aplle"
          />
        </div>
        <button type="button" className="btn btn-secondary btn-block">
          More Options
        </button>
        <button type="button" className="btn btn-primary btn-block">
          Submit
        </button>
      </div>
    );
  }
}
