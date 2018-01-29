/**
 *
 * Settings
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';

import { makeSelectConnected } from 'containers/App/selectors';
import { request } from 'containers/App/actions';

import theme from '../../theme';

const Button = styled.button`
  background-color: ${theme.bg};
  color: ${theme.fg};
  border: 1px solid ${theme.border};
  border-radius: 10px;
  height: 2em;
  margin: 20px 20px;

  &:hover {
    background-color: ${theme.bg2};
    cursor: pointer;
  }
`


export class Settings extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.onReload = this.onReload.bind(this);
  }

  onReload() {
    this.props.dispatch(request({
      requestType: 'RELOAD_WRAPPER'
    }));
    this.props.history.push('/dashboard');
  }

  render() {
    return (
      <div>
        <Button onClick={this.onReload}>Reload Wrapper</Button>
      </div>
    );
  }
}

Settings.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(null, mapDispatchToProps);

export default compose(
  withConnect,
)(Settings);
