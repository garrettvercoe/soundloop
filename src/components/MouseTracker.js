import React from "react";
import { connect } from "react-redux";
import {
  makeInvisible,
  cursorMoveSelected,
  cursorMoveUnselected
} from "../actions/cursor";
import { updateOctave, updateSustain } from "../actions/shared";
import { updateTone } from "../actions/tones";
import {
  red,
  pink,
  purple,
  indigo,
  blue,
  cyan,
  teal,
  green,
  yellow,
  amber,
  orange,
  deepOrange
} from "@material-ui/core/colors/";

const colorHues = [
  red,
  pink,
  purple,
  indigo,
  blue,
  cyan,
  teal,
  green,
  yellow,
  amber,
  orange,
  deepOrange
];

class Cursor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "#000"
    };
    this.handleClick = this.handleClick.bind(this);
    this.showRightCursor = this.showRightCursor.bind(this);
    this.findPointerEvent = this.findPointerEvent.bind(this);
    this.pickUp = this.pickUp.bind(this);
    this.putDown = this.putDown.bind(this);
    this.erase = this.erase.bind(this);
    this.cx = this.props.center.x;
    this.cy = this.props.center.y;

    this.snap = this.snap.bind(this);
    this.findSnapCoordinates = this.findSnapCoordinates.bind(this);
    this.findClosestLoop = this.findClosestLoop.bind(this);
  }

  componentDidMount() {
    this.colorHue = this.props.sounds.indexOf(this.props.sound);
    this.setState({ color: colorHues[this.colorHue][this.props.octave * 100] });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.sound !== this.props.sound) {
      this.colorHue = this.props.sounds.indexOf(this.props.sound);
      this.setState({
        color: colorHues[this.colorHue][this.props.octave * 100]
      });
    }
    if (prevProps.octave !== this.props.octave) {
      this.colorHue = this.props.sounds.indexOf(this.props.sound);
      this.setState({
        color: colorHues[this.colorHue][this.props.octave * 100]
      });
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
      var angle = this.props.loops[loopToSnap.index].rotation;
      var trueCoords = this.findTrueCoordinates(b, a, angle, distToCenter);
      var intervalId = this.findClosestInterval(
        trueCoords.x,
        trueCoords.y,
        loopToSnap.index
      );

      return intervalId;
    }
    return false;
  }

  pickUp(at) {
    //pass in data first to cursor
    if (this.props.tones[at].sound !== null) {
      var sound = this.props.tones[at].sound.replace(/[0-9]/g, "");
      var octave = this.props.tones[at].sound.replace(/[A-Z]/g, "");
      console.log("octave" + octave);
      this.props.dispatch(
        updateTone(at, "#692d54", null, this.props.screenHeight / 350)
      );
      this.props.dispatch(updateSustain(this.props.tones[at].duration));
      this.props.dispatch(updateOctave(octave));
      this.props.dispatch(cursorMoveSelected(sound));
    }
  }
  putDown(at) {
    this.props.dispatch(
      updateTone(
        at,
        this.state.color,
        this.props.sound + this.props.octave,
        //  this.props.screenHeight / 50,
        this.props.toneSizes[this.props.selectedSustain],
        this.props.selectedSustain
      )
    );
    if (this.props.mode === "MOVE_SELECTED") {
      this.props.dispatch(cursorMoveUnselected());
    }
  }
  erase(at) {
    if (this.props.tones[at].sound !== null) {
      this.props.dispatch(
        updateTone(at, "#692d54", null, this.props.screenHeight / 350)
      );
    }
  }

  showRightCursor() {
    switch (this.props.mode) {
      case "ADD":
        return "pointer";
      case "ERASE":
        return "crosshair";
      case "MOVE_UNSELECTED":
        return "grab";
      case "MOVE_SELECTED":
        return "grabbed";
      default:
        return "auto";
    }
  }

  findPointerEvent() {
    switch (this.props.mode) {
      case "ERASE":
        return "auto";
      case "ADD":
        return "auto";
      case "MOVE_UNSELECTED":
        return "auto";
      case "MOVE_SELECTED":
        return "auto";

      default:
        return "none";
    }
  }
  handleClick() {
    if (this.props.playing === false) {
      const x = this.props.cursorPos.x;
      const y = this.props.cursorPos.y;

      var toneId = this.snap(x, y);
      if (toneId !== false) {
        if (this.props.mode === "ADD") {
          this.putDown(toneId);
        } else if (this.props.mode === "MOVE_UNSELECTED") {
          this.pickUp(toneId);
        } else if (this.props.mode === "MOVE_SELECTED") {
          this.putDown(toneId);
        } else if (this.props.mode === "ERASE") {
          this.erase(toneId);
        }
      }
    }
  }
  render() {
    if (this.props.playing) {
      this.width = 0;
      this.height = 0;
    } else {
      this.width = 2 * this.props.toneSizes[this.props.selectedSustain];
      this.height = 2 * this.props.toneSizes[this.props.selectedSustain];
    }
    return (
      <React.Fragment>
        <div
          onClick={() => this.handleClick()}
          style={{
            position: "absolute",
            left:
              this.props.cursorPos.x -
              this.props.toneSizes[this.props.selectedSustain],
            top:
              this.props.cursorPos.y -
              this.props.toneSizes[this.props.selectedSustain],
            width: this.width,
            height: this.height,

            borderRadius: "50%",
            pointerEvents: this.findPointerEvent(),
            cursor: this.showRightCursor(),
            background:
              this.props.mode === "ADD" || this.props.mode === "MOVE_SELECTED"
                ? this.state.color
                : "transparent"
          }}
        />
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    mode: state.cursor.mode,
    loops: state.loops,
    tones: state.tones,
    sound: state.cursor.sound,
    sounds: state.shared.sounds,
    playing: state.shared.playing,
    center: state.shared.center,
    octave: state.shared.octave,
    screenHeight: state.shared.screenHeight,
    selectedSustain: state.shared.selectedSustain,
    toneSizes: state.shared.toneSizes
  };
}

export default connect(mapStateToProps)(Cursor);
