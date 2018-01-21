/**
*
* ServerCard
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

import theme from '../../theme';
import messages from './messages';

const spin = keyframes`
  100%
  {
    transform: rotate(360deg);
  }
`

const LoadingAnimation = styled.div`
  &::before {
    content: '';
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    margin-top: -10px;
    margin-left: -10px;
    border-radius: 50%;
    border: 2px solid ${theme.bg};
    border-top-color: ${theme.fg};
    animation: ${spin} .6s linear infinite;
  }
`

const LoadingContainer = styled.div`
  position: relative;
  width: 20px;
  height: 20px;
`

const Loading = function(props) {
  return (<LoadingContainer><LoadingAnimation /></LoadingContainer>)
};

const Card = styled(Link)`
  float: left;
  width: 300px;
  height: 300px;
  background-color: ${theme.bg};
  color: ${theme.fg};
  border-bottom: 1px solid ${theme.border};
  border-radius: 5px;
  padding: 1em 1em;
  margin: 2em 2em;
  text-align: center;
  text-decoration: none;

  &:hover {
    background-color: ${theme.bg2};
    cursor: pointer;
  }
`;

const H1 = styled.h1`
  padding: 0 0;
  margin: 0 0;
`;

const P = styled.p`
  margin: 0 0;
`

const FlexDiv = styled.div`
  display: flex;
`

const Containerleft = styled.div`
  width: 150px;
  text-align: left;
`

const ContainerRight = styled.div`
  width: 150px;
  text-align: right;
`

const RedP = styled.p`
  color: ${theme.red};
  margin: 0 0;
`

const YellowP = styled.p`
  color: ${theme.yellow};
  margin: 0 0;
`

const GreenP = styled.p`
  color: ${theme.green};
  margin: 0 0;
`

function Status(props) {
  switch(props.running) {
    case 'STARTING':
      return (<YellowP>STARTING</YellowP>);
    case 'STOPPING':
      return (<YellowP>STOPPING</YellowP>);
    case 'STARTED':
      return (<GreenP>RUNNING</GreenP>);
    case 'STOPPED':
      return (<RedP>STOPPED</RedP>);
    default:
      return (<Loading />);
  }
}

function ServerCard(props) {
  if (!props.server) {
    return (
      <Card to='/dashboard'>
        <Loading />
      </Card>
    )
  }
  const slug = props.server.get('slug');
  const name = props.server.get('name');
  const running = props.server.get('running');
  const cpu = props.server.getIn(['monitoring', 3]);
  const mem = props.server.getIn(['monitoring', 9]);
  const read = props.server.getIn(['monitoring', 12]);
  const write = props.server.getIn(['monitoring', 13]);
  const lastBackupDate = props.server.getIn(['lastBackup', 'date']);
  const lastBackupSize = props.server.getIn(['lastBackup', 'size']);
  const players = props.server.get('players');

  return (
    <Card to={'/server/'+slug}>

      {name !== undefined ? (<H1>{name}</H1>) : (<Loading />)}
      {slug !== undefined ? (<P>({slug})</P>) : (<Loading />)}

      <FlexDiv>
        <Containerleft>
          <Status running={running} />
        </Containerleft>
        <ContainerRight>
          {players !== undefined? (<P>{players} Players</P>) : (<Loading />)}
        </ContainerRight>
      </FlexDiv>
      <FlexDiv>
        {cpu !== undefined ? (<P>%CPU: {cpu}</P>) : (<P>...</P>) }
      </FlexDiv>
      <FlexDiv>
        {mem !== undefined? (<P>%MEM: {mem}</P>) : (<P>...</P>) }
      </FlexDiv>
      <FlexDiv>
        {read !== undefined ? (<P>kB_rd/s: {read}</P>) : (<P>...</P>) }
      </FlexDiv>
      <FlexDiv>
        {write !== undefined ? (<P>kB_wr/s: {write}</P>) : (<P>...</P>) }
      </FlexDiv>
      <FlexDiv>
        {lastBackupDate !== undefined ? (<P>last backup at {lastBackupDate} ({lastBackupSize})</P>) : (<Loading />) }
      </FlexDiv>
    </Card>
  );
}

ServerCard.propTypes = {

};

export default ServerCard;
