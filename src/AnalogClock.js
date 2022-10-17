import React from "react";
import PropTypes from "prop-types";

export  default class AnalogClock extends React.Component{
  constructor(props){
    super(props);
    this.state = {second: 0, minute: 0, hour: 0};
  }
  render(){
    return (
      <div className = "container" data-testid = "container"
          /** style = {{width: this.props.radius, height: this.props.radius}} **/>
        <ClockCircle/>
        <ClockTextCircle second = {this.state.second}
            minute = {this.state.minute} hour = {this.state.hour}/>
      </div>
    );
  }
  tick(){
    // All the hands wraps to 0deg when they turn 360deg, hence % 360
    this.setState(state => ({second: (state.second + 6) % 360}));
    // The minute hand turns 1deg when the second hand turn 60deg
    if(this.state.second % 60 === 0)
      this.setState(state => ({minute: (state.minute + 1) % 360}));
    // The hour hand turns 1deg when the minute hand turns 12deg
    if(this.state.minute % 12 === 0 && this.state.second === 0)
      this.setState(state => ({hour: (state.hour + 1) % 360}));
  }
  componentDidMount(){
    this.timeID = setInterval(() => this.tick(), 1000);
  }
  componentWillUnmount(){
    clearInterval(this.timeID);
  }
}

AnalogClock.defaultProps = {
  radius: 300, rimColor: "gainsboro", tickColor: "black",
  fontColor: "black", fontSize: 16, secondHandColor: "lightgreen",
  minuteHandColor: "lightblue", hourHandColor: "lightcoral",
  minorClaibration: true, majorCalibration: true
}

AnalogClock.propTypes = {
  radius: PropTypes.number, rimColor: PropTypes.string,
  tickColor: PropTypes.string, fontColor: PropTypes.string,
  fontSize: PropTypes.number, secondHandColor: PropTypes.string,
  minuteHandColor: PropTypes.string, hourHandColor: PropTypes.string,
  minorCallibration: PropTypes.bool, majorCallibration: PropTypes.bool
}

/**
 * @returns a div element which is a container for the clock's callibration
 */
function ClockCircle(){
  return (
    <div className = "clockCircle" data-testid = "clockCircle">
      <ClockTicks/>
    </div>
  );
}

/**
 * @returns the callibrations on the clock
 */
function ClockTicks(){
  let left, top;
  const ticks = [];
  for(let t = 6; t <= 360; t += 6){
    top = 50 * (1 - Math.cos(t*Math.PI/180)) + "%";
    left = 50 * (1 + Math.sin(t*Math.PI/180)) + "%";
    if(t % 5){
      ticks.push(<MinorTicks key = {t} left = {left} top = {top} deg = {t}/>);
    }
    else{
      ticks.push(<MajorTicks key = {t} left = {left} top = {top} deg = {t}/>);
    }
  }
  return ticks;
}

/**
 * @param {object} props containing left:number, top:number, and deg:number
 * @returns a div element which is the long callibration of the clock
 */
function MajorTicks(props){
  return (
    <div className = "ticks majorTicks"  data-testid = "majorTicks"
        style = {{left: props.left, top: props.top,
            transform: `rotate(${props.deg}deg) translate(-50%)`}}/>
  );
}

/**
 * @param {object} props containing left:number, top:number, and deg:number
 * @returns a div element which is the minor callibration on the clock
 */
function MinorTicks(props){
  return (
    <div className = "ticks minorTicks" data-testid = "minorTicks"
        style = {{left: props.left, top: props.top,
            transform: `rotate(${props.deg}deg) translate(-50%)`}}/>
    );
}

/**
 * @param {object} props containing second:number, minute:number, and hour:number
 * @returns a div element which is a circle containing the clock text
 */
function ClockTextCircle(props){
  return (
    <div className = "clockTextCircle" data-testid = "clockTextCircle">
      <ClockText/>
      <ClockHands name = "second" turn = {props.second}/>
      <ClockHands name = "minute" turn = {props.minute}/>
      <ClockHands name = "hour" turn = {props.hour}/>
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
function ClockText(){
  let left, top;
  const texts = [];
  for(let t = 1; t <= 12; t++){
    top = 50 * (1 - Math.cos(t * 30 * Math.PI / 180)) + "%";
    left = 50 * (1 + Math.sin(t * 30 * Math.PI / 180)) + "%";
    texts.push(
      <div key = {t} className = "clockText" data-testid = "clockText"
          style = {{/**fontSize: this.props.width/18,**/ left: left, top: top}}>{t}</div>
    );
  }
  return texts;
}

/**
 * @param {object} props containing name:string, turn:number
 * @returns a div element representing the hand of the clock
 */
function ClockHands(props){
  return <div className = {`hands ${props.name}Hand`} data-testid = {`${props.name}Hand`}
      style = {{transform: `rotate(${props.turn}deg)`}}/>;
}