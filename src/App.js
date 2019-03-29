import React, { Component } from 'react';

import styled from 'styled-components';

import { subscribeToUpdates } from './api';
import { Display } from './Display';
import { Clock } from './Clock';

const FadeSwitch = styled.div`
  position: absolute;
  top: 240;
  left: 400;
  z-index: 1000;
  opacity: ${props => props.in ? 1 : 0};
  transition: opacity 2s ease;
`;

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

class App extends Component {
  state = {
    id: null,
    title: null,
    artist: null,
    image: null,
    album: null,
    composer: null,
    genre: null,
    playing: false,
    volume: 0,
    progress: null,
    resetTimer: null,
    showClock: true,
  }

  componentDidMount() {
    subscribeToUpdates((err, data) => {
      this.setState(state => ({...state, ...data}));
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.playing && !this.state.playing) {
      this.setState(state => ({
        ...state,
        resetTimer: setTimeout(
          () => this.setState(state => ({...state, showClock: true, resetTimer: null})),
          1000
        )
      }));
    } else if (!prevState.playing && this.state.playing) {
      if (this.state.resetTimer) {
        clearTimeout(this.state.resetTimer);
      }
      this.setState(state => ({...state, showClock: false, resetTimer: null}))
    }
  }

  render() {
    return <Background>
      <FadeSwitch in={this.state.showClock}>
        <Clock />
      </FadeSwitch>
      <FadeSwitch in={!this.state.showClock}>
        <Display
          id={this.state.id}
          title={this.state.title}
          artist={this.state.artist}
          album={this.state.album}
          playing={this.state.playing}
          image={this.state.image}
          volume={this.state.volume}
          progress={this.state.progress}
        />
      </FadeSwitch>
    </Background>;
  }
}

export default App;
