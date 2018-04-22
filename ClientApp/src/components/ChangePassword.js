import React, { Component } from 'react';
import * as api from '../api';

export default class ChangePassword extends Component {
  state = {
    oldPassword: '',
    newPassword: '',
    checked: false,
    error: '',
    success: false,
  };
  passwordError() {
    if (!this.state.newPassword) {
      return 'Password can not be empty';
    }
    return undefined;
  }
  isValid = () => {
    return !this.passwordError();
  };
  handleSubmit = e => {
    e.preventDefault();
    this.setState({ checked: true });
    if (this.isValid()) {
      const { newPassword, oldPassword } = this.state;
      const userId = this.props.match.params.id;
      api
        .put(`api/users/${userId}/${oldPassword}/${newPassword}`)
        .then(() => {
          this.setState({ success: true });
        })
        .catch(error => {
          this.setState({ error: error.message });
        });
    }
  };
  render() {
    const { oldPassword, newPassword, checked, error, success } = this.state;
    if (success) {
      return (
        <div className="alert alert-success" role="alert">
          Your password has been changed!
        </div>
      );
    } else {
      return (
        <form>
          {error ? (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          ) : null}
          <div className="form-group">
            <label htmlFor="password">Current password</label>
            <input
              type="password"
              className="form-control"
              value={oldPassword}
              onChange={e =>
                this.setState({ oldPassword: e.currentTarget.value })
              }
              id="oldPassword"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">New password</label>
            <input
              type="password"
              className={
                'form-control ' +
                (checked && this.passwordError() ? 'is-invalid' : '')
              }
              value={newPassword}
              onChange={e =>
                this.setState({ newPassword: e.currentTarget.value })
              }
              id="newPassword"
            />
            {checked && this.passwordError() ? (
              <div className="invalid-feedback">{this.passwordError()}</div>
            ) : null}
          </div>
          <button className="btn btn-primary" onClick={this.handleSubmit}>
            Change
          </button>
        </form>
      );
    }
  }
}
