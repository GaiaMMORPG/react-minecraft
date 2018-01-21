/**
*
* Tabs
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import theme from '../../theme';
import messages from './messages';


const NavBar = styled.div`
  width: 100%;
  display: flex;
  background-color: ${theme.bg};
  color: ${theme.fg};
  border-bottom: 1px solid ${theme.border};
  padding: 0 1em;
`;

const HeaderLink = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-left: 1px solid ${theme.border};
  border-right: 1px solid ${theme.border};
  background-color: ${theme.bg};
  color: ${theme.fg};
  text-decoration: none;
  margin-left: 1em;
  padding: 0 1em;

  &:hover {
    background-color: ${theme.fg};
    color: ${theme.bg};
  }
`

function Tabs(props) {
  return (
    <NavBar>
      <HeaderLink to={`/server/${props.slug}/console`}>Console</HeaderLink>
      <HeaderLink to={`/server/${props.slug}/backups`}>Backups</HeaderLink>
    </NavBar>
  );
}

Tabs.propTypes = {

};

export default Tabs;
