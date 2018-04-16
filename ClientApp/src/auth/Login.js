import './Login.css';
import * as api from '../api';
import React, { Component } from 'react';

export default class Login extends Component {
  state = { userName: '', password: '', remeberMe: false, error: '' };
  handleLogin = () => {
    api
      .post('api/login', this.state)
      .then(user => {
        this.props.onUserLoggedIn(user);
      })
      .catch(error => {
        this.setState({ error: error.message });
      });
  };
  render() {
    console.log('render Login');
    return (
      <div className="login-form-container">
        <div className="form-signin">
          <h1 className="mb-3">
            <i className="fa fa-check" />
          </h1>
          <h1 className="h3 mb-3 font-weight-normal">Voting Login</h1>
          <label htmlFor="userName" className="sr-only">
            Username
          </label>
          <input
            type="text"
            id="userName"
            className="form-control mb-3"
            placeholder="Username"
            value={this.state.userName}
            onChange={e => this.setState({ userName: e.currentTarget.value })}
            autoFocus
          />
          <label htmlFor="inputPassword" className="sr-only">
            Password
          </label>
          <input
            type="password"
            id="inputPassword"
            className="form-control"
            placeholder="Password"
            value={this.state.password}
            onChange={e => this.setState({ password: e.currentTarget.value })}
          />
          <div className="checkbox mb-3">
            <label>
              <input
                type="checkbox"
                value="remember-me"
                checked={this.state.remeberMe}
                onChange={() =>
                  this.setState({ remeberMe: !this.state.remeberMe })
                }
              />{' '}
              Remember me
            </label>
          </div>
          <button
            className="btn btn-lg btn-primary btn-block"
            onClick={() => this.handleLogin()}
          >
            Sign in
          </button>
          {this.state.error ? (
            <div className="alert alert-danger mt-3" role="alert">
              {this.state.error}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}
