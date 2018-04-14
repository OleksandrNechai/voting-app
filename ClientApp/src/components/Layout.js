import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';

export class Layout extends Component {
  displayName = Layout.name;

  render() {
    return (
      <Fragment>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
          <a className="navbar-brand">Voting</a>
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
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink className="nav-link" exact to="/signup">
                  <i className="fa fa-home" /> Sign Up
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>

        <main role="main" className="container">
          {this.props.children}
        </main>
      </Fragment>
    );
  }
}
