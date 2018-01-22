/**
 *
 * Console
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectConnected, makeSelectConsole } from 'containers/App/selectors';
import { request } from 'containers/App/actions';

import messages from './messages';

export class Console extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
  }

  init() {
    this.props.dispatch(request({
      requestType: 'SUBSCRIBE_SERVER_CONSOLE',
      value: {
        slug: this.props.match.params.slug
      }
    }));
  }

  componentDidMount() {
    if (this.props.connected) {
      this.init();
    }
  }

  componentWillUnmount() {
    this.props.dispatch(request({
      requestType: 'UNSUBSCRIBE_SERVER_CONSOLE',
      value: {
        slug: this.props.match.params.slug
      }
    }));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.connected && this.props.connected !== nextProps.connected) {
      this.init();
    }
  }

  render() {
    console.log(this.props.console);
    let lines = [];
    if (this.props.console) {
      lines = this.props.console.toJS().map((line, i) => {
        return (
          <li key={i}>{line}</li>
        );
      });
    }

    return (
      <ul>
        {lines}
      </ul>
    );
  }
}

Console.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
  connected: makeSelectConnected(),
  console: makeSelectConsole(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(Console);
