import React, { Component } from 'react';

export default class SignUp extends Component {
  state = { name: '', email: '', password: '', checked: false };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ checked: true });
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

  render() {
    const { name, email, checked } = this.state;
    return (
      <form>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={e => this.setState({ name: e.currentTarget.value })}
          />
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
          <input type="password" className="form-control" id="password" />
        </div>
        <button className="btn btn-primary" onClick={this.handleSubmit}>
          Sign up
        </button>
      </form>
    );
  }
}
