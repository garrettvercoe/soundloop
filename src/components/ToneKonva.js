import React from "react";
import "../styles/index.css";
import { Circle, Group } from "react-konva";
import { connect } from "react-redux";
import Konva from "konva";
import { updateLoop } from "../actions/loops";
import { playTone } from "../actions/cord";
import { throwStatement, thisExpression } from "@babel/types";
import { updateTone, deleteTone, replaceTone } from "../actions/tones";

class ToneKonva extends React.Component {
  constructor(props) {
    super(props);

    this.cx = this.props.center.x;
    this.cy = this.props.center.y;
    this.angularSpeed = 0;
    this.trueTime = 0;
    this.lastTrueTime = 0;
    this.lastTime = 0;

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

    var cos = 
      (2 * (radius * radius) -
        Math.abs((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1))) /
        (2 * (radius * radius))

    // some cases where cos < -1 by small float amount, this corrects it
    if (cos < -1){
      cos = -1;
    }

    var rad = Math.acos(cos);
    
    console.log("acos(" + cos + ")")

    var deg = rad * (180 / Math.PI);

    if (this.props.offset.x > 0) {
      return 360 - deg;
    } else return deg;
  }

  componentDidMount() {
    this.angularSpeed = this.props.loops[this.props.attachedLoop].speed;

    this.angle = this.getAngle();
    console.log("KONVA ANGLE for " + this.props.id + ": " + this.angle)
    this.timerInit = ((360 - (this.angle % 360)) / this.angularSpeed) * 1000;
    this.timerLoop = (360 / this.angularSpeed) * 1000;

    // rotate circle initially to loop rotation
    // this.circle.rotate(this.props.rotation);

    this.anim = new Konva.Animation(frame => {
      
      var tDiff = frame.timeDiff;
      var angleDiff = (tDiff * this.angularSpeed) / 1000;
      // rotate the group
      this.group.rotate(angleDiff);
      console.log("frame.time for " + this.props.id + ": " + frame.time)
      console.log("frame.timeDiff for " + this.props.id + ": " + frame.timeDiff)
      this.trueTime = frame.time - this.lastTime;
      console.log("angleDiff for " + this.props.id + ": " + angleDiff)
      console.log("angleSpeed for " + this.props.id + ": " + this.angularSpeed)

      if (
        this.timerInit - 10 < this.trueTime &&
        this.trueTime < this.timerInit + 10 &&
        this.props.sound !== null
      ) {
        this.props.dispatch(playTone(this.props.sound, this.props.duration));
      } else if (
        this.trueTime % this.timerLoop < this.timerInit + 20 &&
        this.trueTime % this.timerLoop > this.timerInit - 20 &&
        this.props.sound !== null
      ) {
        this.props.dispatch(playTone(this.props.sound, this.props.duration));
      }
    }, this.group.getLayer());

    // if (this.props.playing) {
    //   this.anim.start();
    // }
  }

  componentDidUpdate(prevProps) {

    if (prevProps.sound !== this.props.sound && this.props.sound !== null) {
      this.innerCircle.fill("transparent")
    }

    if (prevProps.sound !== this.props.sound && this.props.sound === null) {
      this.innerCircle.fill("transparent")
    }

    // TEMPO CHANGE
    // listen for when speed of attached loop changes, was not consistent when listening for tempo to change
    if (
      prevProps.loops[this.props.attachedLoop].speed !==
      this.props.loops[this.props.attachedLoop].speed
    ) {
      // check to see if changed within same pause
      if (this.lastTrueTime !== this.trueTime) {
        this.lastTime += this.trueTime;
        this.lastTrueTime = this.trueTime;
      }
      this.angle = this.getAngle();

      var newAngle = (this.angle + this.group.rotation()) % 360;

      this.angle = newAngle;
      this.angularSpeed = this.props.loops[this.props.attachedLoop].speed;
      this.timerInit = ((360 - (this.angle % 360)) / this.angularSpeed) * 1000;

      this.timerLoop = (360 / this.angularSpeed) * 1000;
    }

    if (
        prevProps.loops[this.props.attachedLoop].active !==
          this.props.loops[this.props.attachedLoop].active
      ) {
        if (this.props.loops[this.props.attachedLoop].active){
        this.props.dispatch(updateTone(this.props.id, "#692D55", null, this.props.screenHeight / 350));
        }
        else if (!this.props.loops[this.props.attachedLoop].active){
          this.props.dispatch(updateTone(this.props.id, "transparent", null, this.props.screenHeight / 350));
          }
      }

    if (prevProps.playing !== this.props.playing) {
      if (this.props.playing) {
        this.anim.start();
        if (
          this.props.sound === null &&
          this.props.loops[this.props.attachedLoop].active === true
        ) {
          this.props.dispatch(
            updateTone(this.props.id, "transparent", null, 0)
          );
        }
      } else {
        this.anim.isRunning() && this.anim.stop();
        if (
          this.props.sound === null &&
          this.props.loops[this.props.attachedLoop].active === true
        ) {
          this.props.dispatch(
            updateTone(
              this.props.id,
              "#692D55",
              null,
              this.props.screenHeight / 350
            )
          );
        }
        
        // on pause, update the rotation value of the loop in the store
        this.props.dispatch(
          updateLoop(this.props.attachedLoop, this.group.rotation())
        );
        console.log("rotation by: " + this.group.rotation())
        console.log("Angle for " + this.props.s)
      }
    }
  }

  render() {
    var color = "transparent";
    if (this.props.loops[this.props.attachedLoop].active) {
      color = this.props.color;
    }
    return (
      <Group
        x={this.props.x}
        y={this.props.y}
        offset={this.props.offset}
        ref={node => {
          this.group = node;
        }}
      >
        <Circle
          // x={this.props.x}
          // y={this.props.y}
          fill={color}
          stroke={this.props.stroke}
          strokeWidth={this.props.strokeWidth}
          radius={this.props.radius}
          // offset={this.props.offset}
          ref={node => {
            this.circle = node;
          }}
          // onClick={()=>this.props.dispatch(deleteTone(this.props.id))}
        />
        <Circle
          fill={"transparent"}
          radius={this.props.screenHeight / 350}
          ref={node => {
            this.innerCircle = node;
          }}
        />
      </Group>
    );
  }
}

function mapStateToProps(state) {
  //console.log(state); // state
  return {
    playing: state.shared.playing,
    loops: state.loops,
    tones: state.tones,
    center: state.shared.center,
    mode: state.shared.mode,
    screenHeight: state.shared.screenHeight,
    tempo: state.shared.tempo
  };
}

export default connect(mapStateToProps)(ToneKonva);
