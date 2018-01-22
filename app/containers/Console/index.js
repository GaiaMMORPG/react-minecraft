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
import styled from 'styled-components';

import { makeSelectConnected, makeSelectConsole } from 'containers/App/selectors';
import { request } from 'containers/App/actions';

import theme from '../../theme';
import messages from './messages';

const Ul = styled.ul`
  background-color: #000000;
  color: #ffffff;
  margin: 0 0;
  height: 80vh;
  overflow-y: scroll;
  list-style-type: none;
`;

const Input = styled.input`
  width: 100%;
  height: 2em;
  padding-left: 10px;
`

const CheckInput = styled.input`
  border-right: 1px solid #333333;
  margin-left: 10px;
`

const FlexDiv = styled.div`
  display: flex;
  border-top: 1px solid #333333;
  background-color: #000000;
  color: #ffffff;
`

const ConsoleInput = styled.div`
  flex: 9;
`

const Autoscroll = styled.div`
  flex: 1;
`

export class Console extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      inputHistory: [],
      index: 0,
      autoscroll: true
    };

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
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

  componentDidUpdate() {
    if (this.state.autoscroll) {
      this.scrollToBottom();
    }
  }

  scrollToBottom() {
    this.refs[0].scrollIntoView({ behavior: "smooth" });
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      const command = this.state.input;
      if (command === '') {
        return;
      }
      this.props.dispatch(request({
        requestType: 'COMMAND',
        value: {
          slug: this.props.match.params.slug,
          command: command
        }
      }));

      const inputHistory = this.state.inputHistory.slice();
      inputHistory.push(command);
      this.setState({
        input: '',
        inputHistory: inputHistory,
        index: inputHistory.length
      });
    } else if (event.key == 'ArrowUp') {
      const index = this.state.index > 0 ? this.state.index - 1 : 0;
      console.log(index);
      this.setState({
        input: this.state.inputHistory[index],
        index: index
      });
    } else if (event.key == 'ArrowDown') {
      const index = this.state.index < this.state.inputHistory.length ? this.state.index + 1 : this.state.inputHistory.length;
      this.setState({
        input: this.state.inputHistory[index],
        index: index
      });
    }
  }

  handleChange(event) {
    this.setState({
      input: event.target.value
    });
  }

  handleCheckbox(event) {
    this.setState({
      autoscroll: event.target.checked
    });
  }

  render() {
    let lines = [];
    if (this.props.console) {
      lines = this.props.console.toJS().map((line, i) => {
        return (
          <li key={i}>{line}</li>
        );
      });
    }

    return (
      <div>
        <Ul>
          {lines}
          <li ref={0}></li>
        </Ul>
        <FlexDiv>
          <ConsoleInput>
            <Input type='text' value={this.state.input} onChange={this.handleChange} onKeyDown={this.handleKeyPress} />
          </ConsoleInput>
          <Autoscroll>
            scroll
            <CheckInput type='checkbox' checked={this.state.autoscroll} onChange={this.handleCheckbox} />
          </Autoscroll>
        </FlexDiv>
      </div>
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
