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
      noteSelected: false,
      snapped: false
    };
    this.cx = this.props.center.x;
    this.cy = this.props.center.y;
    this.handleStop = this.handleStop.bind(this);
    this.snap = this.snap.bind(this);
    this.findSnapCoordinates = this.findSnapCoordinates.bind(this);
    this.findClosestLoop = this.findClosestLoop.bind(this);
    this.handleClick = this.handleClick.bind(this);
    // this.handleDrag = this.handleDrag.bind(this);
    // this.handleDragClick = this.handleDragClick.bind(this);
  }

  handleClick() {
    if (!this.state.noteSelected) {
      for (var i = 0; i < this.props.tones.length; i++) {
        if (
          this.props.tones[i].sound === null &&
          !this.props.playing &&
          this.props.loops[this.props.tones[i].attachedLoop].active === true
        ) {
          this.props.dispatch(updateTone(i, "#fff", null, 1.5));
        }
      }
      this.setState({ noteSelected: true });
    } else {
      this.rect = this.selector.current.getBoundingClientRect();
      const x = this.rect.left;
      const y = this.rect.top;

      var snapped = this.snap(x, y);

      if (snapped) {
        this.setState({ noteSelected: true });
      }
      if (!snapped) {
        // this.handleStop();

        this.setState({ noteSelected: false });
        this.setState({
          deltaPosition: {
            x: 0,
            y: 0
          }
        });
        console.log(this.state.deltaPosition.x);
        for (let i = 0; i < this.props.tones.length; i++) {
          if (
            this.props.tones[i].sound === null &&
            this.props.loops[this.props.tones[i].attachedLoop].active === true
          ) {
            this.props.dispatch(updateTone(i, "transparent", null, 1.5));
          }
        }
      }
    }

    // if (!this.props.playing) {
    //   this.props.dispatch(playTone(this.props.sound));
    // }
  }

  handleStop() {}

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

  findClosestInterval(a, b) {
    // finds closest tone and returns the index so that color can be changed
    var min = 100;
    var ret = 0;
    for (var i = 0; i < this.props.tones.length; i++) {
      // need to compare pt + or - offset
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
    return ret;
  }

  findFakeCoordinates(x1, y1, angle, distance) {
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
      var fakeCoords = this.findFakeCoordinates(b, a, angle, distToCenter);

      var intervalId = this.findClosestInterval(fakeCoords.x, fakeCoords.y);

      this.props.dispatch(
        updateTone(intervalId, this.props.color, this.props.sound, 0)
      );
      return true;
    }
    return false;
  }

  // handleDrag() {
  //   for (var i = 0; i < this.props.tones.length; i++) {
  //     if (
  //       this.props.tones[i].sound === null &&
  //       !this.props.playing &&
  //       this.props.loops[this.props.tones[i].attachedLoop].active === true
  //     ) {
  //       this.props.dispatch(updateTone(i, "#fff", null, 1.5));
  //     }
  //   }
  // }

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

        <Draggable
          position={this.state.deltaPosition}
          onStop={
            this.state.noteSelected
              ? false
              : () => {
                  console.log("going back");
                }
          }
          allowAnyClick={true}
          onMouseDown={this.handleClick}
          disabled={this.state.noteSelected}
        >
          <div
            ref={this.selector}
            className="hover-shadow"
            // onMouseDown={() => this.handleClick()}
            style={{
              borderRadius: "100%",
              backgroundColor: this.props.color,
              width: "2rem",
              zIndex: 1,
              height: "2rem",

              border: "none",
              outline: "none"
            }}
          >
            {JSON.stringify(this.state.deltaPosition)}
            <div className="note-select">{this.props.children}</div>
          </div>
        </Draggable>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  console.log(state); // state
  return {
    loops: state.loops,
    tones: state.tones,
    playing: state.shared.playing,
    center: state.shared.center
  };
}

export default connect(mapStateToProps)(ToneButton);
