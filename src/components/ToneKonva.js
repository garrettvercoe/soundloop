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
    this.handleDragEnd = this.handleDragEnd.bind(this);
    this.handleDragStart = this.handleDragStart.bind(this);
    this.snap = this.snap.bind(this);
    this.findClosestLoop = this.findClosestLoop.bind(this);
    this.findTrueOffset = this.findTrueOffset.bind(this);
  }

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
    
    this.angularSpeed = this.props.loops[this.props.attachedLoop].speed

    this.angle = this.getAngle();
    this.timerInit = ((360 - (this.angle % 360)) / this.angularSpeed) * 1000;
    this.timerLoop = (360 / this.angularSpeed) * 1000;

    // rotate circle initially to loop rotation
    // this.circle.rotate(this.props.rotation);

    this.anim = new Konva.Animation(frame => {
      var tDiff = frame.timeDiff;
      var angleDiff = (tDiff * this.angularSpeed) / 1000;
      // rotate the group
      this.group.rotate(angleDiff);
      this.trueTime = frame.time - this.lastTime;

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
    // on delete (when prev != current color), move circle back to original position and offset but keep rotation
    // if (prevProps.color !== this.props.color) {
    //   this.circle.x(this.props.x);
    //   this.circle.y(this.props.y);
    //   this.circle.offset({ x: this.props.offset.x, y: this.props.offset.y });
    // }

    // if (prevProps.color !== this.props.color && this.props.) {
        
    // }

    // TEMPO CHANGE
    // listen for when speed of attached loop changes, was not consistent when listening for tempo to change
    if (prevProps.loops[this.props.attachedLoop].speed !== this.props.loops[this.props.attachedLoop].speed) {
      // check to see if changed within same pause
      if (this.lastTrueTime !== this.trueTime) {
        this.lastTime += this.trueTime;
        this.lastTrueTime = this.trueTime;
      }
      this.angle = this.getAngle();
      
      var newAngle = (this.angle + this.circle.rotation())%360
      
      this.angle = newAngle;
      this.angularSpeed = this.props.loops[this.props.attachedLoop].speed;
      this.timerInit = ((360 - (this.angle % 360)) / this.angularSpeed) * 1000;
      
      this.timerLoop = (360 / this.angularSpeed) * 1000;
    }

    if (prevProps.loops[this.props.attachedLoop].active !== this.props.loops[this.props.attachedLoop].active 
      && !this.props.loops[this.props.attachedLoop].active) {
          this.props.dispatch(updateTone(this.props.id, "transparent", null, 0));
    }

    if (prevProps.playing !== this.props.playing) {
      if (this.props.playing) {
        this.anim.start();
        if (
          this.props.sound === null &&
          this.props.loops[this.props.attachedLoop].active === true
        ) {
          this.props.dispatch(updateTone(this.props.id, "transparent", null, 0));
        }
      } else {
        this.anim.isRunning() && this.anim.stop(); 
        if (
          this.props.sound === null &&
          this.props.loops[this.props.attachedLoop].active === true
          ) {
            this.props.dispatch(updateTone(this.props.id, "#692D55", null, this.props.screenHeight / 350));
        }
        // on pause, update the rotation value of the loop in the store
        this.props.dispatch(
          updateLoop(this.props.attachedLoop, this.circle.rotation())
        );
      }
    }
  }

  findClosestLoop(distToCenter) {
    // iterate through loops array and compare radii
    var acceptableRange = 50;
    var loopArray = this.props.loops;
    var id = 0;
    var curr = loopArray[id].radius;
    var diff = Math.abs(distToCenter - curr);

    for (var i = 0; i < loopArray.length; i++) {
      if (loopArray[i].active) {
        var newdiff = Math.abs(distToCenter - loopArray[i].radius);
        if (newdiff < diff) {
          diff = newdiff;
          curr = loopArray[i].radius;
          id = i;
        }
      }
    }

    if (diff < acceptableRange) {
      return { index: id, value: curr };
    } else {
      return null;
    }
  }

  findClosestInterval(a, b, loop) {
    // finds closest tone and returns the index so that color can be changed
    var min = 100;
    var ret = 0;
    for (var i = 0; i < this.props.tones.length; i++) {
      // need to compare pt + or - offset
      // attached loop must be the same as the loopToSnap
      if (this.props.tones[i].attachedLoop === loop) {
        var x = this.cx - this.props.tones[i].offset.x;
        var y = this.cy - this.props.tones[i].offset.y;
        var diffX = x - a;
        var diffY = y - b;
        var dist = Math.sqrt(diffX * diffX + diffY * diffY);
        if (dist < min) {
          min = dist;
          ret = this.props.tones[i].id;
        }
      }
    }
    return ret;
  }

  // find new offset values for snap, depending on rotation
  findTrueOffset(offX, offY, angle) {
    var originalAngle = Math.atan2(offX, offY);
    var angleRad = angle * (Math.PI / 180);
    var newAngle = originalAngle - angleRad;
    var dist = Math.sqrt(offX * offX + offY * offY);
    const offX2 = Math.sin(newAngle) * dist;
    const offY2 = Math.cos(newAngle) * dist;
    return { x: offX2, y: offY2 };
  }

  findTrueCoordinates(x1, y1, angle, distance) {
    // current angle
    var originalAngle = Math.atan2(y1, x1);
    var angleRad = angle * (Math.PI / 180);
    var newAngle = originalAngle - angleRad;
    const x2 = this.cx + Math.cos(newAngle) * distance;
    const y2 = this.cy + Math.sin(newAngle) * distance;
    return { x: x2, y: y2 };
  }

  snap(x1, y1) {
    // calculate virtual location with rotation
    // first calculate distance
    var a = y1 - this.cy;
    var b = x1 - this.cx;
    var distToCenter = Math.sqrt(a * a + b * b);
    var loopToSnap = this.findClosestLoop(distToCenter);

    if (loopToSnap) {
      var angle = this.props.loops[loopToSnap.index].rotation;
      var trueCoords = this.findTrueCoordinates(b, a, angle, distToCenter);
      var intervalId = this.findClosestInterval(
        trueCoords.x,
        trueCoords.y,
        loopToSnap.index
      );
      if (!this.props.playing) {
        this.props.dispatch(
          updateTone(
            intervalId,
            this.props.color,
            this.props.sound,
            this.props.radius,
            this.props.duration
          )
        );
      }
    }
  }

  handleDragStart() {
    if (this.props.playing === false) {
      // move current tone above all of the others
      this.circle.zIndex(this.props.tones.length);
      // for all tones, if sound null make them visible on drag
      var radius = this.props.screenHeight / 350;
      for (var i = 0; i < this.props.tones.length; i++) {
        if (
          this.props.tones[i].sound === null &&
          this.props.loops[this.props.tones[i].attachedLoop].active === true
        ) {
          this.props.dispatch(updateTone(i, "#692D55", null, radius));
        }
      }
    }
  }

  // delete
  handleDragEnd() {
    var loopRotation = this.props.loops[this.props.attachedLoop].rotation;
    var circX = this.circle.x();
    var circY = this.circle.y();
    var offsetX = this.circle.offsetX();
    var offsetY = this.circle.offsetY();
    var trueOff = this.findTrueOffset(offsetX, offsetY, this.circle.rotation());

    // new x and y are coord at original
    var newX = circX - trueOff.x;
    var newY = circY - trueOff.y;

    this.snap(newX, newY);
    // make the tones transparent on drag end
    for (var i = 0; i < this.props.tones.length; i++) {
      if (
        this.props.tones[i].sound === null &&
        this.props.loops[this.props.tones[i].attachedLoop].active === true
      ) {
        this.props.dispatch(updateTone(i, "transparent", null, 1.5));
      }
    }
    // this.props.dispatch(deleteTone(this.props.id));
    this.props.dispatch(
      replaceTone(
        this.props.id,
        this.cx,
        this.cy,
        "transparent",
        "#fff",
        1.5,
        this.props.offset.x,
        this.props.offset.y,
        this.props.attachedLoop,
        this.props.screenHeight / 50,
        null,
        loopRotation
      )
    );
  }

  render() {
    var color = "transparent";
    if (this.props.loops[this.props.attachedLoop].active === true) {
      color = this.props.color;
    }
    return (
      <Group 
        x={this.props.x}
        y={this.props.y}
        offset={this.props.offset}
        ref={node => {this.group = node;}}>
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
        draggable={true}
        onDragStart={this.handleDragStart}
        onDragEnd={this.handleDragEnd}
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
