import React, { Component } from 'react';

export class Home extends Component {
  displayName = Home.name;

  render() {
    return (
      <div className="jumbotron">
        <h1 className="display-4">Welcome to our voting app!</h1>
        <p className="lead">
          Here you can create a poll as well as answer other peoples' polls.
        </p>
        <p className="lead">Have fun!</p>
      </div>
    );
  }
}
