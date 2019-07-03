import React from "react";
import "../styles/index.css";

import Draggable from "react-draggable"; // The default
import { connect } from "react-redux";
import { addTone } from "../actions/tones";

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
    var acceptableRange = 50;
    var radii = [300];
    var id = 0;
    var curr = radii[id];
    var diff = Math.abs(distToCenter - curr);

    for (var i = 0; i < radii.length; i++) {
      var newdiff = Math.abs(distToCenter - radii[i]);
      if (newdiff < diff) {
        diff = newdiff;
        curr = radii[i];
        id = i;
      }
    }

    if (diff < acceptableRange) {
      return { index: id, value: curr };
    } else {
      return null;
    }
  }

  findSnapCoordinates(opposite, hypotenuse, cx, cy, distance) {
    var angle = Math.asin(opposite / hypotenuse);
    const x2 = cx + Math.cos(angle) * distance;
    const y2 = cy - Math.sin(angle) * distance;
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
    if (loopToSnap) {
      var snapCoords = this.findSnapCoordinates(
        a,
        distToCenter,
        cx,
        cy,
        loopToSnap.value
      );

      var newA = (snapCoords.y - cy) * -1;
      var newB = snapCoords.x - cx;

      this.props.dispatch(
        addTone(
          snapCoords.x,
          snapCoords.y,
          this.props.color,
          newA,
          newB,
          0,
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

export default connect()(ToneButton);
