/**
*
* Tabs
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function Tabs() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

Tabs.propTypes = {

};

export default Tabs;
