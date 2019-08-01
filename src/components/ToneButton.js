import React from "react";
import "../styles/index.css";

import Draggable from "react-draggable"; // The default
import { connect } from "react-redux";
import { updateTone } from "../actions/tones";
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
    this.cx = this.props.center.x;
    this.cy = this.props.center.y;
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
    var loopArray = this.props.loops;

    var id = 0;
    var curr = loopArray[id].radius;
    var diff = Math.abs(distToCenter - curr);

    for (var i = 0; i < loopArray.length; i++) {
      if (this.props.loops[i].active) {
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

  findSnapCoordinates(x1, y1, cx, cy, distance) {
    var angle = Math.atan2(y1, x1);
    const x2 = cx - Math.cos(angle) * distance;
    const y2 = cy + Math.sin(angle) * distance;
    return { x: x2, y: y2 };
  }

  findClosestInterval(a, b, loop) {
    // finds closest tone and returns the index so that color can be changed
    var min = 100;
    var ret = 0;
    for (var i = 0; i < this.props.tones.length; i++) {
      // need to compare pt + or - offset
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

  // convert current cursor location to coordinates
  findTrueCoordinates(x1, y1, angle, distance) {
    // current angle from center
    var originalAngle = Math.atan2(y1, x1);
    // original angle in radians
    var angleRad = angle * (Math.PI / 180);
    // new angle
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
      console.log("LSNAP in TB: " + loopToSnap.index);
      var angle = this.props.loops[loopToSnap.index].rotation;
      var trueCoords = this.findTrueCoordinates(b, a, angle, distToCenter);

      var intervalId = this.findClosestInterval(
        trueCoords.x,
        trueCoords.y,
        loopToSnap.index
      );

      this.props.dispatch(
        updateTone(
          intervalId,
          this.props.color,
          this.props.sound,
          //  this.props.screenHeight / 50,
          this.props.toneSizes[this.props.selectedSustain],
          this.props.selectedSustain
        )
      );
    }
  }

  handleStop() {
    if (this.props.playing === false) {
      this.rect = this.selector.current.getBoundingClientRect();
      const x = this.rect.left;
      const y = this.rect.top;

      this.snap(x, y);

      // this.setState({
      //   deltaPosition: {
      //     x: 0,
      //     y: 0
      //   }
      // });

      for (var i = 0; i < this.props.tones.length; i++) {
        if (
          this.props.tones[i].sound === null &&
          this.props.loops[this.props.tones[i].attachedLoop].active === true
        ) {
          this.props.dispatch(updateTone(i, "transparent", null, 1.5));
        }
      }
    }
  }

  handleClick() {
    if (!this.props.playing) {
      this.props.dispatch(
        playTone(this.props.sound, this.props.selectedSustain)
      );
    }
  }

  handleDrag() {
    var radius = this.props.screenHeight / 350;
    for (var i = 0; i < this.props.tones.length; i++) {
      if (
        this.props.tones[i].sound === null &&
        !this.props.playing &&
        this.props.loops[this.props.tones[i].attachedLoop].active === true
      ) {
        this.props.dispatch(updateTone(i, "#692D55", null, radius));
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
        <Draggable
          position={this.state.deltaPosition}
          onStop={this.handleStop}
          onStart={this.handleDrag}
        >
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
          >
            <div
              className="note-select"
              style={{ color: this.props.textColor }}
            >
              {this.props.note}
            </div>
          </div>
        </Draggable>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    loops: state.loops,
    tones: state.tones,
    playing: state.shared.playing,
    center: state.shared.center,
    screenHeight: state.shared.screenHeight,
    selectedSustain: state.shared.selectedSustain,
    toneSizes: state.shared.toneSizes
  };
}

//

export default connect(mapStateToProps)(ToneButton);
