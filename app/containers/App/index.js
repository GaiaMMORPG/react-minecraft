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
import { Switch, Route } from 'react-router-dom';

import { connect } from 'react-redux';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { createStructuredSelector } from 'reselect';

import HomePage from 'containers/HomePage/Loadable';
import Dashboard from 'containers/Dashboard/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import Header from 'components/Header';

import { request, connectWebsocket, disconnectWebsocket } from './actions';
import { makeSelectConnected } from './selectors';
import reducer from './reducer';
import saga from './saga';

export class App extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.connectWebsocket();
  }

  componentWillUnmount() {
    this.props.disconnectWebsocket();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route component={NotFoundPage} />
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
  };
}

const mapStateToProps = createStructuredSelector({
  connected: makeSelectConnected(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'app', reducer });
const withSaga = injectSaga({ key: 'app', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(App);
