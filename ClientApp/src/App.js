import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import Login from './auth/Login';
import { withRouter } from 'react-router-dom';
import * as api from './api';

class App extends Component {
  displayName = App.name;
  state = { user: undefined, isLoading: true };

  handleLogin = user => {
    this.setState({ user });
    this.props.history.push(`/users/${user.id}`);
  };

  handleLogout = () => {
    api.post('api/logout').then(() => {
      this.setState({ user: undefined });
    });
  };

  componentDidMount() {
    api
      .get('api/login')
      .then(user => {
        if (user) {
          this.handleLogin(user);
        }
      })
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    const { user } = this.state;
    if (this.state.isLoading)
      return <h1 style={{ textAlign: 'center' }}>Loading...</h1>;

    return (
      <Layout user={user} onUserLogOut={this.handleLogout}>
        <Switch>
          <Route
            exact
            path="/login"
            render={() =>
              user ? (
                <Dashboard user={user} />
              ) : (
                <Login onUserLoggedIn={this.handleLogin} />
              )
            }
          />
          <Route
            exact
            path="/signup"
            render={() => (user ? <Dashboard user={user} /> : <SignUp />)}
          />
          <Route
            exact
            path="/"
            render={() => (user ? <Dashboard user={user} /> : <Home />)}
          />
          <Redirect to="/" />
        </Switch>
      </Layout>
    );
  }
}

export default withRouter(App);
