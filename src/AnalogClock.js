import './App.css';
import React from 'react';
import PropTypes from 'prop-types';
import { ClockCircle } from './components/ClockCircle';
import { ClockTextCircle } from './components/ClockTextCircle';

export default class AnalogClock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { second: 0, minute: 0, hour: 0 };
  }
  render() {
    return (
      <div className='container' data-testid='container'
        style={{
          width: this.props.radius,
          height: this.props.radius
        }}
      >
        <ClockCircle rimColor={this.props.rimColor}
          tickColor={this.props.tickColor}
          minorCallibration={this.props.minorCallibration}
          majorCallibration={this.props.majorCallibration}
        />
        <ClockTextCircle second={this.state.second}
          fillColor={this.props.fillColor}
          fontColor={this.props.fontColor}
          fontSize={this.props.fontSize}
          minute={this.state.minute}
          hour={this.state.hour}
          secondHandColor={this.props.secondHandColor}
          minuteHandColor={this.props.minuteHandColor}
          hourHandColor={this.props.hourHandColor}
        />
      </div>
    );
  }
  tick() {
    // All the hands wraps to 0deg when they turn 360deg, hence % 360
    this.setState(state => ({ second: (state.second + 6) % 360 }));
    // The minute hand turns 1deg when the second hand turn 60deg
    if (this.state.second % 60 === 0)
      this.setState(state => ({ minute: (state.minute + 1) % 360 }));
    // The hour hand turns 1deg when the minute hand turns 12deg
    if (this.state.minute % 12 === 0 && this.state.second === 0)
      this.setState(state => ({ hour: (state.hour + 1) % 360 }));
  }
  componentDidMount() {
    this.timeID = setInterval(() => this.tick(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timeID);
  }
}

AnalogClock.defaultProps = {
  radius: 300,
  fontSize: 16,
  fontColor: 'black',
  tickColor: 'black',
  rimColor: 'gainsboro',
  hourHandColor: 'grey',
  fillColor: 'ghostwhite',
  minorCallibration: true,
  majorCallibration: true,
  secondHandColor: 'blueviolet',
  minuteHandColor: 'greenyellow'
}

AnalogClock.propTypes = {
  radius: PropTypes.number,
  fontSize: PropTypes.number,
  rimColor: PropTypes.string,
  fillColor: PropTypes.string,
  tickColor: PropTypes.string,
  fontColor: PropTypes.string,
  hourHandColor: PropTypes.string,
  secondHandColor: PropTypes.string,
  minuteHandColor: PropTypes.string,
  minorCallibration: PropTypes.bool,
  majorCallibration: PropTypes.bool
}
