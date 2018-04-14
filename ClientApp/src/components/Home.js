import React, { Component } from 'react';

export class Home extends Component {
  displayName = Home.name;

  render() {
    return (
      <div class="jumbotron">
        <h1 class="display-4">Welcome to our voting app!</h1>
        <p class="lead">
          Here you can create a poll as well as answer other peoples' polls.
        </p>
        <p class="lead">Have fun!</p>
      </div>
    );
  }
}
