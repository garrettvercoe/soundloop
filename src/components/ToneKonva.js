import React from "react";
import "../styles/index.css";
import { Circle, Layer } from "react-konva";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import Portal from "./Portal";
import { connect } from "react-redux";
import Konva from "konva";
import { addTone, rotateTone } from "../actions/tones";
import { updateLoop } from "../actions/loops";
import { playTone } from "../actions/cord";
import { throwStatement, thisExpression } from "@babel/types";

class ToneKonva extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDragging: false,
      // x: window.innerWidth / 2,
      // y: window.innerHeight / 2,
      active: false
    };
    this.getAngle = this.getAngle.bind(this);
  }

  getAngle() {
    var radius = this.props.loops[this.props.attachedLoop].radius;
    var x1 = this.props.x - this.props.offset.x;
    // round to prevent errors in acos calculation where > 1 or < -1
    // could also possibly round the final value before acos()
    var y1 = Math.round(this.props.y + this.props.offset.y);
    var x2 = this.props.x;
    var y2 = Math.round(this.props.y + radius);

    // var y1 = this.props.y + this.props.offset.y;
    // var x2 = this.props.x;
    // var y2 = this.props.y + radius;

    var rad = Math.acos(
      (2 * (radius * radius) -
        Math.abs((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1))) / 
        (2 * (radius * radius))
    );

    var test = (2 * (radius * radius) -
    Math.abs((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1))) / 
    (2 * (radius * radius))
    //test = test.toFixed(2)
    // var rad = test;

    console.log("CALC: " + test)
    var deg = rad * ((180 / Math.PI));
    console.log("DEG: " + deg)
    if (this.props.offset.x > 0) {
      return 360 - deg;
    } 
    else return deg; 
  }

  componentDidMount() {
    //var angularSpeed = Math.floor(this.props.loops[this.props.attachedLoop].speed);
    var angularSpeed = this.props.loops[this.props.attachedLoop].speed;
    //var angularSpeed = 75;
    var angle = this.getAngle();
    console.log("ANGLE: " + angle)
    var timerInit = ((360 - (angle % 360)) / angularSpeed) * 1000;
    this.circle.opacity(((this.circle.rotation() + angle) % 360) / 1080 + 0.66);
    var timerLoop = (360 / angularSpeed) * 1000;
    var played = false;
    

    this.anim = new Konva.Animation(frame => {
      var angleDiff = (frame.timeDiff * angularSpeed) / 1000;
      this.circle.rotate(angleDiff);
      // console.log("COLOR " + this.props.color + " PLAYED: " + played)
      //variable opacity based on angular location
      this.circle.opacity(
        ((this.circle.rotation() + angle) % 360) / 1080 + 0.66
      );

      // if (
      //   !played &&
      //   timerInit - 10 < frame.time &&
      //   frame.time < timerInit + 10 && 
      //   this.props.sound !== null
      // ) {
      //   console.log("!played color: " + this.props.color + " sound: " + this.props.sound)
      //   //console.log("Sound before dis: " + this.props.sound)
      //   this.props.dispatch(playTone(this.props.sound));
      //   played = true;
      //   //console.log("SOUND NOT PLAYED: " + JSON.stringify(this.props))
      // } else if (
      //   played &&
      //   frame.time % timerLoop < timerInit + 20 &&
      //   frame.time % timerLoop > timerInit - 20 && 
      //   this.props.sound !== null
      // ) {
      //   console.log("played color: " + this.props.color)
      //   this.props.dispatch(playTone(this.props.sound));
      //   //console.log("SOUND PLAYED: " + JSON.stringify(this.props))
      // }

      if (
        timerInit - 10 < frame.time &&
        frame.time < timerInit + 10 && 
        this.props.sound !== null
      ) {
        this.props.dispatch(playTone(this.props.sound));
        played = true;
      } else if (
        frame.time % timerLoop < timerInit + 20 &&
        frame.time % timerLoop > timerInit - 20 && 
        this.props.sound !== null
      ) {
        this.props.dispatch(playTone(this.props.sound));
      }

      // else if (this.props.sound === null) {
      //   this.circle.fill("transparent");
      // }

    }, this.circle.getLayer());
    if (this.props.playing) {
      this.anim.start();
      
    }
  }

  // findAngleCoord(cx, cy, angle, distance){
  //   const x2 = cx - Math.cos(angle) * distance;
  //   const y2 = cy + Math.sin(angle) * distance;
  //   return { x: x2, y: y2 };
  // }

  componentDidUpdate(prevProps) {
    // if (this.props.loops[this.props.attachedLoop].active === false){
    //   this.circle.fill("transparent");
    // }
    if (prevProps.playing !== this.props.playing) {
      if (this.props.playing) {
        this.anim.start();
        // console.log("ROTATION: " + this.circle.rotation())
        // console.log("OFFSETX: " + this.circle.offsetX())
        // console.log("Position: " + this.circle.x())
        // if (this.props.sound === null) {
        //   this.circle.fill("transparent");
        // }
      } else {
        this.anim.isRunning() && this.anim.stop();
        console.log("ROTATION: " + this.circle.rotation())
        console.log("OFFSETX: " + this.circle.offsetX())
        console.log("Position: " + this.circle.x())
        // var off = this.findAngleCoord(window.innerWidth/2, window.innerHeight/2, this.circle.rotation()*(Math.PI/180), this.props.loops[this.props.attachedLoop].radius)
        // this.props.dispatch(
        //   rotateTone(
        //     this.props.id,
        //     {x: off.x, y: off.y}
        //   )
        // );
        // on pause, update the offset values in the store

        // on pause, update the rotation value of the loop in the store
        this.props.dispatch(
          updateLoop(
            this.props.attachedLoop,
            this.circle.rotation()
          )
        )
      }
    }
  }
  

  render() {
    var color = "transparent";
    if (this.props.loops[this.props.attachedLoop].active === true){
      color = this.props.color
    }
    return (
      <Circle
        x={this.props.x}
        y={this.props.y}
        fill={color}
        stroke={this.props.stroke}
        strokeWidth={this.props.strokeWidth}
        radius={this.props.radius}
        offset={this.props.offset}
        ref={node => {
          this.circle = node;
        }}
        onDragStart={() => {
          this.setState({
            isDragging: true
          });
        }}
        onDragEnd={() => this.props.dispatch(deleteTone(this.props.id))}
        draggable={true}
      />
    );
  }
}

function mapStateToProps(state) {
  //console.log(state); // state
  return {
    playing: state.shared.playing,
    loops: state.loops,
    rot: state.shared.rotation
  };
}

export default connect(mapStateToProps)(ToneKonva);