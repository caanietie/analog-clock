import "./App.css";
import React from "react";
import PropTypes from "prop-types";

export default class AnalogClock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { second: 0, minute: 0, hour: 0 };
  }
  render() {
    return (
      <div className="container" data-testid="container"
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
  fontColor: "black",
  tickColor: "black",
  rimColor: "gainsboro",
  hourHandColor: "grey",
  fillColor: "ghostwhite",
  minorCallibration: true,
  majorCallibration: true,
  secondHandColor: "blueviolet",
  minuteHandColor: "greenyellow"
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

/**
 * @returns a div element which is a container for the clock's callibration
 */
function ClockCircle(props) {
  let clockTicks = "";
  if (props.minorCallibration || props.majorCallibration)
    clockTicks = (
      <ClockTicks tickColor={props.tickColor}
        minorCallibration={props.minorCallibration}
        majorCallibration={props.majorCallibration}
      />
    );
  return (
    <div className="clockCircle" data-testid="clockCircle"
      style={{ backgroundColor: props.rimColor }}
    >
      {clockTicks}
    </div>
  );
}

/**
 * @returns the callibrations on the clock
 */
function ClockTicks(props) {
  let left, top;
  const ticks = [];
  for (let t = 6; t <= 360; t += 6) {
    top = 50 * (1 - Math.cos(t * Math.PI / 180)) + "%";
    left = 50 * (1 + Math.sin(t * Math.PI / 180)) + "%";
    if (t % 5) {
      if (props.minorCallibration)
        ticks.push(
          <Ticks key={t} deg={t}
            top={top} major={t % 5 === 0}
            left={left} tickColor={props.tickColor}
          />
        );
    }
    else {
      if (props.majorCallibration)
        ticks.push(
          <Ticks key={t} deg={t}
            top={top} major={t % 5 === 0}
            left={left} tickColor={props.tickColor}
          />
        );
    }
  }
  return ticks;
}

/**
 * @param {object} props containing left:number, top:number, and deg:number
 * @returns a div element which is the long callibration of the clock
 */
function Ticks(props) {
  return (
    <div className={`ticks ${props.major ? "major" : "minor"}Ticks`}
      data-testid={`${props.major ? "major" : "minor"}Ticks`}
      style={{
        left: props.left, top: props.top,
        backgroundColor: props.tickColor,
        transform: `rotate(${props.deg}deg) translate(-50%)`
      }}
    />
  );
}

/**
 * @param {object} props containing second:number, minute:number, and hour:number
 * @returns a div element which is a circle containing the clock text
 */
function ClockTextCircle(props) {
  return (
    <div className="clockTextCircle"
      data-testid="clockTextCircle"
      style={{ backgroundColor: props.fillColor }}
    >
      <ClockText fontSize={props.fontSize}
        fontColor={props.fontColor}
      />
      <ClockHands name="second" turn={props.second}
        secondHandColor={props.secondHandColor}
      />
      <ClockHands name="minute" turn={props.minute}
        minuteHandColor={props.minuteHandColor}
      />
      <ClockHands name="hour" turn={props.hour}
        hourHandColor={props.hourHandColor}
      />
    </div>
  );
}

/**
 * Text are placed at places corresponding to steps of 30deg
 * top = 50*(1-cos(n*PI/180))percent
 * left = 50*(1+sin(n*PI/180))percent
 * percent is with respect to ClockTextCircle radius and
 * n = 30,60,90,...,360 for 1,2,3,...,12 respectively
 * @returns the numbers on the face of the clock
 */
function ClockText(props) {
  let left, top;
  const texts = [];
  for (let t = 1; t <= 12; t++) {
    top = 50 * (1 - Math.cos(t * 30 * Math.PI / 180)) + "%";
    left = 50 * (1 + Math.sin(t * 30 * Math.PI / 180)) + "%";
    texts.push(
      <div key={t} className="clockText"
        data-testid="clockText"
        style={{
          fontSize: props.fontSize,
          color: props.fontColor,
          left: left, top: top
        }}
      >
        {t}
      </div>
    );
  }
  return texts;
}

/**
 * @param {object} props containing name:string, turn:number
 * @returns a div element representing the hand of the clock
 */
function ClockHands(props) {
  return (
    <div data-testid={`${props.name}Hand`}
      className={`hands ${props.name}Hand`}
      style={{
        transform: `rotate(${props.turn}deg)`,
        backgroundColor: props[`${props.name}HandColor`]
      }}
    />
  );
}