/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { createStructuredSelector } from 'reselect';
import { Helmet } from 'react-helmet';

import AdminRoute from 'containers/AdminRoute/Loadable';
import Login from 'containers/Login/Loadable';
import Dashboard from 'containers/Dashboard/Loadable';
import Server from 'containers/Server/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Settings from 'containers/Settings/Loadable';

import Header from 'components/Header';

import { request, connectWebsocket, disconnectWebsocket } from './actions';
import { makeSelectConnected, makeSelectRole, makeSelectToken, makeSelectAuth } from './selectors';
import reducer from './reducer';
import saga from './saga';

export class App extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
  }

  auth() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    if (username && token) {
      this.props.dispatch(request({
        requestType: 'AUTH_TOKEN',
        value: {
          username: username,
          token: token
        }
      }));
    } else {
      this.props.dispatch({
        type: 'AUTH_TOKEN_FAILED'
      });
    }
  }

  componentDidMount() {
    this.props.connectWebsocket();
    if (this.props.connected) {
      this.auth();
    }
  }

  componentWillUnmount() {
    this.props.disconnectWebsocket();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.connected && this.props.connected !== nextProps.connected) {
      this.auth();
    }
  }

  render() {
    if (!this.props.auth || this.props.auth === 'request_token') {
      return (<div>Please wait...</div>);
    }
    return (
      <div>
        <Helmet
          titleTemplate="Gaïa Admin"
          defaultTitle="Gaïa Admin"
        >
          <meta name="description" content="Gaïa Admin" />
        </Helmet>
        <Header />
        <Switch>
          <Route path="/login" component={Login} />
          <AdminRoute exact path="/" roles={['superadmin', 'admin']} component={Dashboard} />
          <AdminRoute path="/dashboard" roles={['superadmin', 'admin']} component={Dashboard} />
          <AdminRoute path="/server/:slug" roles={['superadmin', 'admin']} component={Server} />
          <AdminRoute path="/settings" roles={['superadmin']} component={Settings} />

          <AdminRoute roles={['superadmin', 'admin']} component={NotFoundPage}
          />
        </Switch>
      </div>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    connectWebsocket: () => dispatch(connectWebsocket()),
    disconnectWebsocket: () => dispatch(disconnectWebsocket()),
    request: (data) => dispatch(request(data)),
    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
  connected: makeSelectConnected(),
  role: makeSelectRole(),
  token: makeSelectToken(),
  auth: makeSelectAuth(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'app', reducer });
const withSaga = injectSaga({ key: 'app', saga });

export default compose(
  withReducer,
  withSaga,
  withRouter,
  withConnect,
)(App);
