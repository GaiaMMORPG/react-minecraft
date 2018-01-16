/**
 *
 * Dashboard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import { makeSelectConnected, makeSelectLoading, makeSelectServers, makeSelectBungee } from 'containers/App/selectors';
import { request } from 'containers/App/actions';
import messages from './messages';

export class Dashboard extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
  }

  init() {
    this.props.dispatch(request({requestType: 'REQUEST_SERVERS_LIST'}));
    this.props.dispatch(request({requestType: 'SUBSCRIBE_SERVERS_DETAIL'}));
  }

  componentDidMount() {
    if (this.props.connected) {
      this.init();
    }
  }

  componentWillUnmount() {
    this.props.dispatch(request({requestType: 'UNSUBSCRIBE_SERVERS_DETAIL'}));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.connected && this.props.connected !== nextProps.connected) {
      this.init();
    }
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  connected: makeSelectConnected(),
  loading: makeSelectLoading(),
  servers: makeSelectServers(),
  bungeecord: makeSelectBungee(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(Dashboard);
