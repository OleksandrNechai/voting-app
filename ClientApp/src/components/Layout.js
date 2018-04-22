import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';

export class Layout extends Component {
  displayName = Layout.name;

  render() {
    const { user, onUserLogOut } = this.props;
    return (
      <Fragment>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
          <a className="navbar-brand" href="void:0">
            Voting
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarsExampleDefault"
            aria-controls="navbarsExampleDefault"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarsExampleDefault">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <NavLink className="nav-link" exact to="/">
                  <i className="fa fa-home" /> Home
                </NavLink>
              </li>
            </ul>
            {user ? (
              <Fragment>
                <ul className="navbar-nav ml-auto">
                  <li>
                    <span className="navbar-text">Hello, {user.userName}</span>{' '}
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      exact
                      to={`/change-password/${user.id}`}
                    >
                      <i className="fa fa-cog" />
                    </NavLink>
                  </li>
                  <li className="nav-item" style={{ cursor: 'pointer' }}>
                    <a className="nav-link" onClick={() => onUserLogOut()}>
                      Logout
                    </a>
                  </li>
                </ul>
              </Fragment>
            ) : (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" exact to="/signup">
                    Sign Up
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" exact to="/login">
                    Login
                  </NavLink>
                </li>
              </ul>
            )}
          </div>
        </nav>

        <main role="main" className="container">
          {this.props.children}
        </main>
      </Fragment>
    );
  }
}
