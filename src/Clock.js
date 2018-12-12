import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

const Background = styled.div`
  background-image: linear-gradient(to bottom right, #ff0070, #800038, black);
  background-color: #222;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 800px;
  background-blend-mode: overlay;
  height: 480px;
  width: 800px;
  padding: 60px;
  display: flex;
  box-sizing: border-box;
  flex-flow: column nowrap;

  align-items: center;
  justify-content: center;
`;

const Time = styled.div`
  font-family: "Montserrat", "Open Sans", Helvetica, sans-serif;
  font-weight: 200;
  font-size: 230px;
  color: #fff;
  margin-top: 12px;
  white-space: nowrap;

  display: flex;
  justify-content: space-between;
`;

const TimeDivider = styled.span`
  line-height: 230px;
  padding: 0 15px;
`;

const TimeElement = styled.span`
  display: inline-block;
  min-width: 260px;
  text-align: ${props => props.align};
`;

export class Clock extends React.Component {
state = {
  timer: null,
  currentTime: new Date()
}

  componentDidMount() {
    this.setState({
      currentTime: new Date(),
      timer: setInterval(
        () => this.setState({currentTime: new Date()}),
        1000
      )
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  render() {
    const currentTime = moment(this.state.currentTime);
    return <Background>
      <Time>
        <TimeElement align='right'>{currentTime.format('HH')}</TimeElement>
        <TimeDivider>:</TimeDivider>
        <TimeElement align='left'>{currentTime.format('mm')}</TimeElement>
      </Time>
    </Background>
  }
}