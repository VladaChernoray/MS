import React, { Component } from 'react';
import video1 from "../video/video1.mp4";
import styled from 'styled-components';
import Wallpaper from "./styled/Wallpaper";
const Content = styled.div`
.player {
  border-radius: 30px;
  position: relative;
  max-width: 750px;
  border: 5px solid rgba(0,0,0,0.2);
  box-shadow: 0 0 20px rgba(0,0,0,0.2);
  font-size: 0;
  overflow: hidden;
}

/* This css is only applied when fullscreen is active. */
.player:fullscreen {
  max-width: none;
  width: 100%;
}

.player:-webkit-full-screen {
  max-width: none;
  width: 100%;
}

.player__video {
  width: 100%;
}

.player__button {
  background: none;
  border: 0;
  line-height: 1;
  color: white;
  text-align: center;
  outline: 0;
  padding: 0;
  cursor: pointer;
  max-width: 50px;
}

.player__button:focus {
  border-color: #ffc600;
}

.player__slider {
  width: 10px;
  height: 30px;
}

.player__controls {
  display: flex;
  position: absolute;
  bottom: 0;
  width: 100%;
  transform: translateY(100%) translateY(-5px);
  transition: all .3s;
  flex-wrap: wrap;
  background: rgba(0,0,0,0.1);
}

.player:hover .player__controls {
  transform: translateY(0);
}

.player:hover .progress {
  height: 15px;
}

.player__controls > * {
  flex: 1;
}

.progress {
  flex: 10;
  position: relative;
  display: flex;
  padding: 0 20px;
  flex-basis: 100%;
  height: 5px;
  transition:height 0.3s;
  cursor: pointer;
}

.progress__filled {
  padding: 0 20px;
  background: white;
  border-radius: 20px;
  flex: 0;
  flex-basis: 0%;
}

input[type=range] {
  -webkit-appearance: none;
  background: transparent;
  width: 100%;
  margin: 0 5px;
}
input[type=range]:focus {
  outline: none;
}
input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  height: 8.4px;
  cursor: pointer;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0), 0 0 1px rgba(13, 13, 13, 0);
  background: white;
  border-radius: 1.3px;
  border: 0.2px solid rgba(1, 1, 1, 0);
}
input[type=range]::-webkit-slider-thumb {
  box-shadow: 0 0 0 rgba(0, 0, 0, 0), 0 0 0 rgba(13, 13, 13, 0);
  height: 15px;
  width: 15px;
  border-radius: 50px;
  background: white;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -3.5px;
  box-shadow: 0 0 2px rgba(0,0,0,0.2);
}
input[type=range]:focus::-wefbkit-slider-runnable-track {
  background: white;
}
input[type=range]::-moz-range-track {
  width: 100%;
  height: 8.4px;
  cursor: pointer;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0), 0 0 1px rgba(13, 13, 13, 0);
  background: white;
  border-radius: 1.3px;
  border: 0.2px solid rgba(1, 1, 1, 0);
}
input[type=range]::-moz-range-thumb {
  box-shadow: 0 0 0 rgba(0, 0, 0, 0), 0 0 0 rgba(13, 13, 13, 0);
  height: 15px;
  width: 15px;
  border-radius: 50px;
  background: white;
  cursor: pointer;
}
`

class VideoPlayer extends Component {
  constructor() {
    super();
    this.togglePlay = this.togglePlay.bind(this);
    this.handleProgress = this.handleProgress.bind(this);
    this.handleRangeUpdate = this.handleRangeUpdate.bind(this);
    this.scrub = this.scrub.bind(this);
    this.startMouseDown = this.startMouseDown.bind(this);
    this.endMouseDown = this.endMouseDown.bind(this);
    this.skip = this.skip.bind(this);
    
    this.state = {
      video: null,
      progress: '0%',
      playbackRate: 1,
      volume: 1,
      isMouseDown: false
    };
  }
  
  componentDidMount() {
    this.setState({
      video: this.refs.video
    }, () => {
      ['pause', 'play'].forEach(event => {
        this.state.video.addEventListener(event, () => {
          this.forceUpdate();
        });
      });
      this.state.video.addEventListener('timeupdate', this.handleProgress);
    });
  }
  
  togglePlay() {
    const { video } = this.state;
    const method = video.paused ? 'play' : 'pause';
    video[method]();
  }
  
  handleProgress() {
    const { video } = this.state;
    const percent = (video.currentTime / video.duration) * 100;
    this.setState({
      progress: `${percent}%`
    });
  }
  
  handleRangeUpdate(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
    // Todo: Check how to update state with Immutable JS
    // instead of using refs
    this.refs.video[name] = value;
  }
  
  scrub(e) {
    const scrubTime = (e.nativeEvent.offsetX / this.refs.video.clientWidth) * this.refs.video.duration;
    if (!isNaN(scrubTime)) {
      this.refs.video.currentTime = scrubTime;
    }
  }
  
  startMouseDown(e) {
    this.setState({
      isMouseDown: true
    });
  }
  
  endMouseDown(e) {
    this.setState({
      isMouseDown: false
    });
  }
  
  skip(e) {
    const skipValue = e.target.attributes[0].value;
    if (!isNaN(skipValue)) {
      this.refs.video.currentTime += Number(skipValue);
    }
  }
  
  render() {
    const { video, progress, playbackRate, volume } = this.state;
    
    return (
      <Content>
        <Wallpaper/>
      <div className="player">
      
        <video
          className="player__video viewer"
          ref="video"
          src= {video1}
          onClick={this.togglePlay}
        />
        
        <div className="player__controls">

          <div 
            className="progress"
            onMouseDown={this.startMouseDown}
            onMouseUp={this.endMouseDown}
            onMouseLeave={this.endMouseDown}
            onMouseMove={(e) => this.state.isMouseDown && this.scrub(e)}
            onClick={this.scrub}
          >
           <div
             className="progress__filled"
             style={{'flexBasis': progress}}
           ></div>
          </div>
             
          <button 
            data-skip="-10" 
            className="player__button"
            onClick={this.skip}
          >« 
          </button>

          <button 
            className="player__button toggle" 
            title="Toggle Play"
            onClick={this.togglePlay}>
            { video && video.paused ? '►' : '❚ ❚' }
          </button>
          
          
          <button 
            data-skip="25" 
            className="player__button"
            onClick={this.skip}
          > »
          </button>
          <input 
            type="range" 
            name="volume" 
            className="player__slider" 
            min="0" max="1" step="0.05" value={volume}
            onChange={this.handleRangeUpdate}
          />
          <input 
            type="range" 
            name="playbackRate" 
            className="player__slider" 
            min="0.5" max="2" step="0.1" value={playbackRate}
            onChange={this.handleRangeUpdate}
          />
    
        </div>

      </div>
      </Content>
      
    );
  }
}

export default VideoPlayer;