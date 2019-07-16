import React from "react";
import "../styles/index.css";

import Draggable from "react-draggable"; // The default
import { connect } from "react-redux";
import { addTone } from "../actions/tones";

function toDegrees(angle) {
  return angle * (180 / Math.PI);
}
class ToneButton extends React.Component {
  constructor(props) {
    super(props);
    this.selector = React.createRef();
    this.state = {
      deltaPosition: {
        x: 0,
        y: 0
      }
    };
    this.handleStop = this.handleStop.bind(this);
    this.snap = this.snap.bind(this);
    this.findSnapCoordinates = this.findSnapCoordinates.bind(this);
    this.findClosestLoop = this.findClosestLoop.bind(this);
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

  findSnapCoordinates(x1, y1, cx, cy, distance) {
    var angle = Math.atan2(y1, x1);
    const x2 = cx - Math.cos(angle) * distance;
    const y2 = cy + Math.sin(angle) * distance;
    return { x: x2, y: y2 };
  }

  snap(x1, y1) {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;

    var a = y1 - cy;
    var b = x1 - cx;
    //c
    var distToCenter = Math.sqrt(a * a + b * b);
    var loopToSnap = this.findClosestLoop(distToCenter);
    console.log("loopToSnap: " + loopToSnap.index)
    if (loopToSnap) {
      var snapCoords = this.findSnapCoordinates(a, b, cx, cy, loopToSnap.value);

      var newA = (snapCoords.y - cy) * -1;
      var newB = snapCoords.x - cx;

      this.props.dispatch(
        addTone(
          cx,
          cy,
          this.props.color,
          newA,
          newB,

          loopToSnap.index,
          20,
          300
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
        <Draggable position={this.state.deltaPosition} onStop={this.handleStop}>
          <button
            ref={this.selector}
            className="hover-shadow"
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
  console.log(state); // state
  return {
    loops: state.loops
  };
}

export default connect(mapStateToProps)(ToneButton);