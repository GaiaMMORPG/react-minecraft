/**
 *
 * AdminRoute
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Route, Redirect, withRouter } from 'react-router-dom';

import { makeSelectConnected, makeSelectRole } from 'containers/App/selectors';


export class AdminRoute extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {roles, role, component: Component, ...rest} = this.props;
    return (
      <Route {...rest} render={(props) => (
        roles.includes(role)
        ? <Component {...props} />
        : <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }} />
      )} />
    );
  }
}

AdminRoute.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
  connected: makeSelectConnected(),
  role: makeSelectRole(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withRouter,
  withConnect,
)(AdminRoute);
