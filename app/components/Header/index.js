/**
*
* Header
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

const H1 = styled.h1`
  padding: 0 0;
  margin: 0 20px;
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
  padding: 0 1em;

  &:hover {
    background-color: ${theme.fg};
    color: ${theme.bg};
  }
`

function Header() {
  return (
    <NavBar>
      <H1>Gaïa</H1>
      <HeaderLink to='/dashboard'>Dashboard</HeaderLink>
      <HeaderLink to='/settings'>Settings</HeaderLink>
    </NavBar>
  );
}

Header.propTypes = {

};

export default Header;
