import React from 'react';
import styled from 'styled-components';
import { path } from 'ramda';

const TimeDisplay = styled.div`
  font-family: "Montserrat", "Open Sans", Helvetica, sans-serif;
  font-weight: 200;
  font-size: 40px;
  color: #fff;
  margin-top: 12px;
  white-space: nowrap;
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

  getDuration = length => (length ? `${Math.floor((length || 1) / 60)}:${Math.round(length % 60).toString().padStart(2, 0)}` : '0:00');

  render() {
    return <TimeDisplay>
      {this.getDuration(this.state.count)} - {this.props.progress ? this.props.progress.duration : null}
    </TimeDisplay>;
  }

}