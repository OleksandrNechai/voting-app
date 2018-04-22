import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import Login from './auth/Login';
import { withRouter } from 'react-router-dom';
import * as api from './api';
import ChangePassword from './components/ChangePassword';

class App extends Component {
  displayName = App.name;
  state = {
    user: undefined,
    isLoading: true,
    error: '',
  };

  handleLogin = user => {
    this.setState({ user });
  };

  handleLogout = () => {
    api.post('api/logout').then(() => {
      this.setState({ user: undefined });
    });
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    api
      .get('api/login')
      .then(user => {
        if (user) {
          this.handleLogin(user);
        }
      })
      .catch(e => this.setState({ error: e.message }))
      .then(() => this.setState({ isLoading: false }));
  }

  knownUserRouts = user => (
    <Switch>
      <Route exact path={'/change-password/:id'} component={ChangePassword} />
      <Route exact path={'/dashboard/:id'} component={Dashboard} />
      <Redirect to={`/dashboard/${user.id}`} />
    </Switch>
  );

  anonymousUserRouts = () => (
    <Switch>
      <Route
        exact
        path="/login"
        render={() => <Login onUserLoggedIn={this.handleLogin} />}
      />
      <Route
        exact
        path="/signup"
        render={() => <SignUp onUserLoggedIn={this.handleLogin} />}
      />
      <Route exact path="/" component={Home} />
      <Redirect to="/" />
    </Switch>
  );

  render() {
    const { user, error } = this.state;

    if (this.state.isLoading)
      return <h1 style={{ textAlign: 'center' }}>Loading...</h1>;

    return (
      <Layout user={user} onUserLogOut={this.handleLogout}>
        {error ? (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        ) : null}
        {user ? this.knownUserRouts(user) : this.anonymousUserRouts()}
      </Layout>
    );
  }
}

export default withRouter(App);
