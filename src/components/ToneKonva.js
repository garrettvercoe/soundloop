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
import { updateTone, deleteTone } from "../actions/tones";

class ToneKonva extends React.Component {
  constructor(props) {
    super(props);

    this.getAngle = this.getAngle.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
    this.handleDragStart = this.handleDragStart.bind(this);
  }

  // CHECK HERE FOR STRANGE SPEED STUFF
  getAngle() {
    var radius = this.props.loops[this.props.attachedLoop].radius;
    var x1 = this.props.x - this.props.offset.x;
    // round to prevent errors in acos calculation where > 1 or < -1
    // could also possibly round the final value before acos()
    var y1 = Math.round(this.props.y + this.props.offset.y);
    var x2 = this.props.x;
    var y2 = Math.round(this.props.y + radius);

    var rad = Math.acos(
      (2 * (radius * radius) -
        Math.abs((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1))) /
        (2 * (radius * radius))
    );

    var deg = rad * (180 / Math.PI);

    if (this.props.offset.x > 0) {
      return 360 - deg;
    } else return deg;
  }

  componentDidMount() {
    //var angularSpeed = Math.floor(this.props.loops[this.props.attachedLoop].speed);
    var angularSpeed = this.props.loops[this.props.attachedLoop].speed;
    //var angularSpeed = 75;
    console.log(this.props);
    var angle = this.getAngle();
    // console.log("ANGLE: " + angle)
    var timerInit = ((360 - (angle % 360)) / angularSpeed) * 1000;
    console.log("TIMER INIT for " + this.props.id + ": " + timerInit);

    //this.circle.opacity(((this.circle.rotation() + angle) % 360) / 1080 + 0.66);
    var timerLoop = (360 / angularSpeed) * 1000;

    // rotate circle initially to loop rotation
    this.circle.rotate(this.props.rotation);

    this.anim = new Konva.Animation(frame => {
      var constTimeDiff = 16;

      // frame.frameRate = 30;
      // frame.timeDiff = 33;

      var angleDiff = (frame.timeDiff * angularSpeed) / 1000;
      // console.log("angleDiff: " + angleDiff)

      this.circle.rotate(angleDiff);
      // console.log("COLOR " + this.props.color + " PLAYED: " + played)
      // variable opacity based on angular location
      // this.circle.opacity(
      //   ((this.circle.rotation() + angle) % 360) / 1080 + 0.66
      // );
      if (
        timerInit - 10 < frame.time &&
        frame.time < timerInit + 10 &&
        this.props.sound !== null
      ) {
        this.props.dispatch(playTone(this.props.sound, this.props.color));
      } else if (
        frame.time % timerLoop < timerInit + 20 &&
        frame.time % timerLoop > timerInit - 20 &&
        this.props.sound !== null
      ) {
        this.props.dispatch(playTone(this.props.sound));
      }
    }, this.circle.getLayer());

    if (this.props.playing) {
      this.anim.start();
    }
  }

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
        if (this.props.sound === null) {
          // this.props.dispatch(updateTone(this.props.id, "transparent", null, 1.5))
        }
      } else {
        this.anim.isRunning() && this.anim.stop();

        // on pause, update the rotation value of the loop in the store
        this.props.dispatch(
          updateLoop(this.props.attachedLoop, this.circle.rotation())
        );
      }
    }
  }

  handleDragStart() {
    for (var i = 0; i < this.props.tones.length; i++) {
      if (this.props.tones[i].sound === null) {
        this.props.dispatch(updateTone(i, "#fff", null, 1.5));
      }
    }
  }

  handleDragEnd() {
    this.props.dispatch(deleteTone(this.props.id));
    var loopRotation = this.props.loops[this.props.attachedLoop].rotation;
    this.props.dispatch(
      addTone(
        window.innerWidth / 2,
        window.innerHeight / 2,
        "red",
        "#fff",
        1.5,
        this.props.offset.x,
        this.props.offset.y,
        this.props.attachedLoop,
        20,
        null,
        loopRotation
      )
    );
    for (var i = 0; i < this.props.tones.length; i++) {
      if (this.props.tones[i].sound === null) {
        this.props.dispatch(updateTone(i, "transparent", null, 1.5));
      }
    }
  }

  render() {
    var color = "transparent";
    if (this.props.loops[this.props.attachedLoop].active === true) {
      color = this.props.color;
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
        // onClick={()=>this.props.dispatch(deleteTone(this.props.id))}
        draggable={true}
        onDragStart={this.handleDragStart}
        onDragEnd={this.handleDragEnd}
      />
    );
  }
}

function mapStateToProps(state) {
  //console.log(state); // state
  return {
    playing: state.shared.playing,
    loops: state.loops,
    rot: state.shared.rotation,
    tones: state.tones
  };
}

export default connect(mapStateToProps)(ToneKonva);
