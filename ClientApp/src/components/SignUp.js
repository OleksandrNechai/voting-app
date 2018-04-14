import React, { Component } from 'react';

export default class SignUp extends Component {
  render() {
    return (
      <form>
        <div class="form-group">
          <label for="name">Name</label>
          <input type="email" class="form-control" id="name" />
        </div>
        <div class="form-group">
          <label for="inputEmail">Email address</label>
          <input type="email" class="form-control" id="inputEmail" />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" class="form-control" id="password" />
        </div>
        <button type="submit" class="btn btn-primary">
          Sign up
        </button>
      </form>
    );
  }
}
