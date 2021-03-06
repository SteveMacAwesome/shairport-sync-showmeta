import React from 'react';
import styled from 'styled-components';
import { path } from 'ramda';

const TimeDisplay = styled.div`
  font-family: "Roboto Mono", "Open Sans", Helvetica, sans-serif;
  font-weight: 200;
  font-size: 40px;
  color: #fff;
  margin-top: 12px;

  display: flex;
  justify-content: flex-end;
  align-items: stretch;
  flex-direction: row;
  flex-wrap: nowrap;
`;

const TimeElement = styled.span`
  display: inline-block;
  text-align: center;
`;

const TimeDivider = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
`;

const TimeSpacer = styled.span`
  min-width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${'' /* text-align: center; */}
`;

export class TimeIndicator extends React.Component {
  state = {
    id: null,
    initialCount: 0,
    count: 0,
  };

  timerRef = null;

  constructor() {
    super();

    const timerFn = () => {
      this.setState((state, props) => {
        return {
          count: state.count + (props.runTimer ? 1 : 0)
        };
      });
    };

    this.timerRef = setInterval(timerFn, 1000);
  }

  static getDerivedStateFromProps(props, state) {
    const position = path(['progress', 'position'], props);

    if (
      (props.id !== state.id) ||
      (position !== state.initialCount)
    ) {
      return {
        id: props.id,
        initialCount: position,
        count: position
      }
    } else {
      return null;
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerRef);
  }

  getHours = length => Math.floor((length || 1) / 3600).toString();
  getMinutes = length => ( Math.floor((length || 1) / 60) % 60 ).toString();
  getSeconds = length => Math.round(length % 60).toString().padStart(2, 0);

  getDuration = length => {
    const hours = this.getHours(length);
    const minutes = hours ? this.getMinutes(length).toString().padStart(2, 0) : this.getMinutes(length).toString();
    const seconds = this.getSeconds(length);
  }

  getDuration = length => (length ? `${Math.floor((length || 1) / 60)}:${Math.round(length % 60).toString().padStart(2, 0)}` : '0:00');

  render() {
    return <TimeDisplay>
      {this.getHours(this.state.count) > 0 ? <TimeElement>{this.getHours(this.state.count)}</TimeElement> : null}
      {this.getHours(this.state.count) > 0 ? <TimeDivider>:</TimeDivider> : null}
      <TimeElement>{this.getMinutes(this.state.count)}</TimeElement>
      <TimeDivider>:</TimeDivider>
      <TimeElement>{this.getSeconds(this.state.count)}</TimeElement>
      <TimeSpacer> - </TimeSpacer>
      <TimeElement>{this.props.progress ? this.props.progress.duration : null}</TimeElement>
      {/* <br /> */}
      {/* {this.getDuration(this.state.count)} - {this.props.progress ? this.props.progress.duration : null} */}
    </TimeDisplay>;
  }

}