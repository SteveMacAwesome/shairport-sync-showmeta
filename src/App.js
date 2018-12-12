import React, { Component } from 'react';

import { subscribeToUpdates } from './api';
import { Display } from './Display';

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
    showClock: false,
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
          3000
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
    return this.state.showClock
    ? <h1>Hi! I'm a clock!</h1>
    : <Display
        id={this.state.id}
        title={this.state.title}
        artist={this.state.artist}
        album={this.state.album}
        playing={this.state.playing}
        image={this.state.image}
        volume={this.state.volume}
        progress={this.state.progress}
      />
    ;
  }
}

export default App;
