import React, { Component } from 'react';
import * as api from '../api';

export default class SignUp extends Component {
  state = { name: '', email: '', password: '', checked: false, error: '' };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ checked: true });
    if (this.isValid()) {
      const { name, email, password } = this.state;
      api
        .post('api/users', { name, email, password })
        .then(() => {
          api
            .post('api/login', {
              userName: name,
              password: password,
              rememberMe: true,
            })
            .then(user => {
              this.props.onUserLoggedIn(user);
            })
            .catch(error => {
              this.setState({ error: error.message });
            });
        })
        .catch(error => {
          this.setState({ error: error.message });
        });
    }
  };

  isValid = () => {
    return !this.emailError() && !this.nameError() && !this.passwordError();
  };

  emailError = () => {
    if (!isEmailValid(this.state.email)) {
      return 'Incorrect email';
    }
    return undefined;

    function isEmailValid(email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
  };

  nameError() {
    if (!this.state.name) {
      return 'Name can not be empty';
    }
    return undefined;
  }

  passwordError() {
    if (!this.state.password) {
      return 'Password can not be empty';
    }
    return undefined;
  }

  render() {
    const { name, email, password, checked, error } = this.state;
    return (
      <form>
        {error ? (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        ) : null}
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className={
              'form-control ' +
              (checked && this.nameError() ? 'is-invalid' : '')
            }
            id="name"
            value={name}
            onChange={e => this.setState({ name: e.currentTarget.value })}
          />
          {checked && this.nameError() ? (
            <div className="invalid-feedback">{this.nameError()}</div>
          ) : null}
        </div>
        <div className="form-group">
          <label htmlFor="inputEmail">Email address</label>
          <input
            type="email"
            className={
              'form-control ' +
              (checked && this.emailError() ? 'is-invalid' : '')
            }
            id="inputEmail"
            value={email}
            onChange={e => this.setState({ email: e.currentTarget.value })}
          />
          {checked && this.emailError() ? (
            <div className="invalid-feedback">{this.emailError()}</div>
          ) : null}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className={
              'form-control ' +
              (checked && this.passwordError() ? 'is-invalid' : '')
            }
            value={password}
            onChange={e => this.setState({ password: e.currentTarget.value })}
            id="password"
          />
          {checked && this.passwordError() ? (
            <div className="invalid-feedback">{this.passwordError()}</div>
          ) : null}
        </div>
        <button className="btn btn-primary" onClick={this.handleSubmit}>
          Sign up
        </button>
      </form>
    );
  }
}
