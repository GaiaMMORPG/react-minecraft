/**
 *
 * Login
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';

import sha256 from 'crypto-js/sha256';
import hex from 'crypto-js/enc-hex';

import { createStructuredSelector } from 'reselect';

import { makeSelectConnected, makeSelectUsername, makeSelectRole, makeSelectToken, makeSelectAuth } from 'containers/App/selectors';
import { request } from 'containers/App/actions';

import theme from '../../theme';

const FlexDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
`
const Container = styled.div`
  background-color: ${theme.bg};
  color: ${theme.fg};
  width: 250px;
  height: 200px;
  padding: 20px;
  border-radius: 10px;
`

const Input = styled.input`
  background-color: ${theme.bg2};
  width: 100%;
  height: 2em;
  margin-top: 10px;
  border: 1px solid ${theme.border};
  border-radius: 10px;
  text-align: center;
`

const Button = styled.button`
  border: 1px solid ${theme.border};
  border-radius: 10px;
  width: 100%;
  height: 2em;
  margin-top: 50px;
`

export class Login extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  login(event) {
    this.props.dispatch(request({
      requestType: 'AUTH',
      value: {
        username: this.state.username,
        password: sha256(this.state.password).toString(hex)
      }
    }));

  }

  render() {
    if (this.props.auth === 'success') {
      localStorage.setItem('username', this.props.username);
      localStorage.setItem('token', this.props.token);
      return (<Redirect to='/' />);
    } else if (this.props.auth === 'failed') {
      localStorage.setItem('token', '');
    }
    return (
      <FlexDiv>
        <Container>
          <Input type="text" placeholder="username" name="username"  value={this.state.username} onChange={this.handleChange} />
          <Input type="text" placeholder="password" name="password"  value={this.state.password} onChange={this.handleChange} />
          <Button onClick={this.login}>Login</Button>
        </Container>
      </FlexDiv>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
  connected: makeSelectConnected(),
  username: makeSelectUsername(),
  role: makeSelectRole(),
  token: makeSelectToken(),
  auth: makeSelectAuth(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(Login);
