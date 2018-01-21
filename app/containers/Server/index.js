/**
 *
 * Server
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { Switch, Route, withRouter } from 'react-router-dom';

import Tabs from 'components/Tabs';

import Console from 'containers/Console/Loadable';
import Backups from 'containers/Backups/Loadable';

import messages from './messages';

export class Server extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Tabs slug={this.props.match.params.slug} />
        <Switch>
          <Route path={`${this.props.match.url}/console`} component={Console} />
          <Route path={`${this.props.match.url}/backups`} component={Backups} />
        </Switch>
      </div>
    );
  }
}

Server.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(null, mapDispatchToProps);

export default compose(
  withRouter,
  withConnect,
)(Server);
