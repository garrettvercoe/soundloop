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
import { updateTone, deleteTone, replaceTone } from "../actions/tones";

class ToneKonva extends React.Component {
  constructor(props) {
    super(props);

    this.cx = this.props.center.x;
    this.cy = this.props.center.y;

    this.getAngle = this.getAngle.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
    this.handleDragStart = this.handleDragStart.bind(this);
    this.snap = this.snap.bind(this);
    this.findClosestLoop = this.findClosestLoop.bind(this);
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
    
    if (prevProps.color !== this.props.color){
      console.log("replace")
      this.circle.x(this.props.x)
      this.circle.y(this.props.y)
      this.circle.offset({x:this.props.offset.x, y:this.props.offset.y})
    }

    if (prevProps.playing !== this.props.playing) {
      if (this.props.playing) {
        this.anim.start();
        
      } else {
        this.anim.isRunning() && this.anim.stop();

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
      var newdiff = Math.abs(distToCenter - loopArray[i].radius);
      if (newdiff < diff) {
        diff = newdiff;
        curr = loopArray[i].radius;
        id = i;
      }
    }

    if (diff < acceptableRange) {
      return { index: id, value: curr };
    } else {
      return null;
    }
  }

  findClosestInterval(a, b){
    // finds closest tone and returns the index so that color can be changed
    var min = 100;
    var ret = 0;
    for (var i = 0; i < this.props.tones.length; i++){
      // need to compare pt + or - offset
      var x = this.cx - this.props.tones[i].offset.x;
      var y = this.cy - this.props.tones[i].offset.y;
      var diffX = x-a;
      var diffY = y-b;
      var dist = Math.sqrt((diffX*diffX)+(diffY*diffY));
      if (dist < min){
        min = dist;
        ret = this.props.tones[i].id;
      }
      
    }
    return ret;
  }

  findFakeCoordinates(x1, y1, angle, distance) {
    // current angle
    var originalAngle = Math.atan2(y1, x1);
    var angleRad = angle * (Math.PI/180);
    var newAngle = originalAngle - angleRad;
    console.log("ORIG ANGLE: " + originalAngle)
    console.log("LOOP ANGLE: " + angleRad)
    console.log("NEW ANGLE: " + newAngle)
    const x2 = this.cx + Math.cos(newAngle) * distance;
    const y2 = this.cy + Math.sin(newAngle) * distance;
    console.log("new X: " + x2);
    console.log("new Y: " + y2)
    return { x: x2, y: y2 };
  }

  snap(x1, y1) {
    console.log("X: " + x1)
    console.log("Y: " + y1)
    
    // calculate virtual location with rotation
    // first calculate distance
    var a = y1 - this.cy;
    var b = x1 - this.cx;
    var distToCenter = Math.sqrt(a * a + b * b);
    console.log("DIST TO CENTER:" + distToCenter)
    var loopToSnap = this.findClosestLoop(distToCenter);
    if (loopToSnap){
      console.log("CLOSEST LOOP: " + loopToSnap.index)
      var angle = this.props.loops[loopToSnap.index].rotation;
      console.log("ANGLE OF CLOSEST: " + angle)
      var fakeCoords = this.findFakeCoordinates(b, a, angle, distToCenter)
    
      var intervalId = this.findClosestInterval(fakeCoords.x, fakeCoords.y)
      console.log("CLOSEST TONE: " + intervalId)
      if( !this.props.playing){
      this.props.dispatch(
        updateTone(
          intervalId,
          this.props.color,
          this.props.sound,
          0
        )
      );
        }
    }
  }

  handleDragStart(){
    // for all tones, if sound null make them visible on drag
    for (var i = 0; i < this.props.tones.length; i++){
      if (this.props.tones[i].sound === null && this.props.loops[this.props.tones[i].attachedLoop].active === true){
        this.props.dispatch(updateTone(i, "#fff", null, 1.5))
      }
    }
  }

  handleDragEnd(){

    var loopRotation = this.props.loops[this.props.attachedLoop].rotation;
    var circX = this.circle.x();
    var circY = this.circle.y();
    var offsetX = this.circle.offsetX();
    var offsetY = this.circle.offsetY();
    // console.log("TEST LOOP ROT: " + loopRotation)
    // console.log("drag end x: " + this.circle.x())
    // console.log("drag end y: " + this.circle.y())
    // console.log("drag end abs pos: " + JSON.stringify(this.circle.getAbsolutePosition()))
    // console.log("drag end offsetX: " + this.circle.offsetX())
    // console.log("drag end offsetY: " + this.circle.offsetY())
    // console.log("drag end pleaseX: " + (circX-offsetX))
    // console.log("drag end pleaseY: " + (circY-offsetY))
    // console.log("drag end x + offsetX: " + this.circle.x()+this.circle.offsetX())
    // console.log("drag end y + offsetY: " + this.circle.y()+this.circle.offsetY())
    this.snap((circX-offsetX), (circY-offsetY))
    for (var i = 0; i < this.props.tones.length; i++){
      if (this.props.tones[i].sound === null && this.props.loops[this.props.tones[i].attachedLoop].active === true){
        this.props.dispatch(updateTone(i, "transparent", null, 1.5))
      }
    }
    // this.props.dispatch(deleteTone(this.props.id));
    this.props.dispatch(replaceTone(this.props.id, window.innerWidth/2, window.innerHeight/2, "transparent", "#fff", 1.5, this.props.offset.x, (this.props.offset.y), this.props.attachedLoop, 20, null, loopRotation))
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
    tones: state.tones,
    center: state.shared.center
  };
}

export default connect(mapStateToProps)(ToneKonva);
