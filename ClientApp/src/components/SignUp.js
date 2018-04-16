import React, { Component } from 'react';

export default class SignUp extends Component {
  render() {
    return (
      <form>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="email" className="form-control" id="name" />
        </div>
        <div className="form-group">
          <label htmlFor="inputEmail">Email address</label>
          <input type="email" className="form-control" id="inputEmail" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" />
        </div>
        <button type="submit" className="btn btn-primary">
          Sign up
        </button>
      </form>
    );
  }
}
