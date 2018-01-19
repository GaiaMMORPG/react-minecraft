/**
*
* ServerCard
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
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

const Card = styled.div`
  float: left;
  width: 300px;
  background-color: ${theme.bg};
  color: ${theme.fg};
  border-bottom: 1px solid ${theme.border};
  border-radius: 5px;
  padding: 1em 1em;
  margin: 2em 2em;
  text-align: center;
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
      <Card>
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

  console.log(props.server.getIn(['monitoring', 3]))

  return (
    <Card>
      <H1>
        {name !== undefined ? name : <Loading />}
      </H1>
      <P> ({slug !== undefined ? slug : <Loading />})</P>

      <FlexDiv>
        <Containerleft>
          <Status running={running} />
        </Containerleft>
        <ContainerRight>
          <P>10 Players</P>
        </ContainerRight>
      </FlexDiv>
      <FlexDiv>
        {cpu !== undefined ? (<P>%CPU: {cpu}</P>) : (<Loading />) }
      </FlexDiv>
      <FlexDiv>
        {mem !== undefined? (<P>%MEM: {mem}</P>) : (<Loading />) }
      </FlexDiv>
      <FlexDiv>
        {read !== undefined ? (<P>kB_rd/s: {read}</P>) : (<Loading />) }
      </FlexDiv>
      <FlexDiv>
        {write !== undefined ? (<P>kB_wr/s: {write}</P>) : (<Loading />) }
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
