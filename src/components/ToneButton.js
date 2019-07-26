import React from "react";
import "../styles/index.css";

import Draggable from "react-draggable"; // The default
import { connect } from "react-redux";
import { addTone, updateTone } from "../actions/tones";
import { playTone } from "../actions/cord";
class ToneButton extends React.Component {
  constructor(props) {
    super(props);
    this.selector = React.createRef();
    this.state = {
      deltaPosition: {
        x: 0,
        y: 0
      },
      snapped: false
    };
    this.handleStop = this.handleStop.bind(this);
    this.snap = this.snap.bind(this);
    this.findSnapCoordinates = this.findSnapCoordinates.bind(this);
    this.findClosestLoop = this.findClosestLoop.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
  }

  findClosestLoop(distToCenter) {
    // iterate through loops array and compare radii
    var acceptableRange = 50;
    var loopArray = []
    //var loopArray = this.props.loops;
    for (var i = 0; i < this.props.loops.length; i ++){
      if (this.props.loops[i].active === true){
        loopArray.push(this.props.loops[i]);
      }
    }
    console.log(loopArray)
    if (loopArray.length > 0){
    var id = 0;
    var curr = loopArray[id].radius;
    var diff = Math.abs(distToCenter - curr);
    
    for (var i = 0; i < loopArray.length; i++) {
      console.log("ACTIVE: " + loopArray[i].active)
      
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
  else return null
  }

  findSnapCoordinates(x1, y1, cx, cy, distance) {
    var angle = Math.atan2(y1, x1);
    const x2 = cx - Math.cos(angle) * distance;
    const y2 = cy + Math.sin(angle) * distance;
    return { x: x2, y: y2 };
  }

  findClosestInterval(a, b){
    // finds closest tone and returns the index so that color can be changed
    var min = 100;
    var ret = 0;
    // console.log("a: " + a)
    // console.log("b: " + b)
    for (var i = 0; i < this.props.tones.length; i++){
      // need to compare pt + or - offset
      var x = this.props.tones[i].position.x - this.props.tones[i].offset.x;
      // console.log("x: " + x)
      var y = this.props.tones[i].position.y - this.props.tones[i].offset.y;
      // console.log("y: " + y)
      var diffX = x-a;
      var diffY = y-b;
      var dist = Math.sqrt((diffX*diffX)+(diffY*diffY));
      // console.log("distance for " + i + ": " + dist)
      // could also set min to this.props.tones[i].id but since id is 0++ they're the same
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
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    var angleRad = angle * (Math.PI/180);
    var newAngle = originalAngle - angleRad;
    console.log("OG ANGLE: " + originalAngle)
    console.log("LOOP ANGLE: " + angleRad)
    console.log("NEW ANGLE: " + newAngle)
    const x2 = cx + Math.cos(newAngle) * distance;
    const y2 = cy + Math.sin(newAngle) * distance;
    return { x: x2, y: y2 };
  }

  snap(x1, y1) {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    console.log("x1: " + x1)
    console.log("y1: " + y1)
    console.log("cy: " + cy)
    
    
    // calculate virtual location with rotation
    // first calculate distance
    var a = y1 - cy;
    var b = x1 - cx;
    var distToCenter = Math.sqrt(a * a + b * b);
    var loopToSnap = this.findClosestLoop(distToCenter);
    if (loopToSnap){
      // console.log("LOOPSNAP: " + loopToSnap.index)
      var angle = this.props.loops[loopToSnap.index].rotation;
      // console.log("ROT: " + angle)
      var fakeCoords = this.findFakeCoordinates(b, a, angle, distToCenter)
      // console.log("FAKEX: " + fakeCoords.x)
      // console.log("FAKEY: " + fakeCoords.y)
      
      //var loopToSnap = this.findClosestLoop(distToCenter);
      //if (loopToSnap) {
      // for each point in loopToSnap, dispatch on coord of pts
      // replace findSnapCoordinats with findClosestLoopPt
      //var snapCoords = this.findSnapCoordinates(a, b, cx, cy, loopToSnap.value);
      //var snapCoords = this.findClosestLoopPt(a, b, loopToSnap.index)

      var intervalId = this.findClosestInterval(fakeCoords.x, fakeCoords.y)
      //var intervalId = this.findClosestInterval(x1, y1)
      console.log("CLOSEST TONE: " + intervalId)
      // var newA = (snapCoords.y - cy) * -1;
      // var newB = snapCoords.x - cx;

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

  handleStop() {
    this.rect = this.selector.current.getBoundingClientRect();

    const x = this.rect.left;
    const y = this.rect.top;

    this.snap(x, y);

    this.setState({
      deltaPosition: {
        x: 0,
        y: 0
      }
    });

    for (var i = 0; i < this.props.tones.length; i++){
      if (this.props.tones[i].sound === null){
        this.props.dispatch(updateTone(i, "transparent", null, 1.5))
      }
    }
  }

  handleClick() {
    if (!this.props.playing) {
      this.props.dispatch(playTone(this.props.sound));
    }
  }

  handleDrag(){
    for (var i = 0; i < this.props.tones.length; i++){
      if (this.props.tones[i].sound === null){
        this.props.dispatch(updateTone(i, "#fff", null, 1.5))
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        <button
          className="hover-shadow"
          style={{
            borderRadius: "100%",
            border: "2px solid",
            borderColor: this.props.color,
            backgroundColor: "transparent",
            width: "2rem",
            height: "2rem",
            position: "absolute",
            outline: "none",
            pointerEvents: "none"
          }}
        />
        <Draggable position={this.state.deltaPosition} onStop={this.handleStop} onStart={this.handleDrag}>
          <div
            ref={this.selector}
            className="hover-shadow"
            onClick={this.handleClick}
            
            style={{
              borderRadius: "100%",
              backgroundColor: this.props.color,
              width: "2rem",
              zIndex: 1,
              height: "2rem",

              border: "none",
              outline: "none"
            }}
          />
        </Draggable>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  //console.log(state); // state
  return {
    loops: state.loops,
    tones: state.tones,
    playing: state.shared.playing
  };
}

export default connect(mapStateToProps)(ToneButton);
