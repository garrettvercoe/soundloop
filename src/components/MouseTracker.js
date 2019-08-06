import React from "react";
import { connect } from "react-redux";
import { makeInvisible } from "../actions/cursor";
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
    this.handleClick = this.handleClick.bind(this);

    // this.selector = React.createRef();

    this.cx = this.props.center.x;
    this.cy = this.props.center.y;

    this.snap = this.snap.bind(this);
    this.findSnapCoordinates = this.findSnapCoordinates.bind(this);
    this.findClosestLoop = this.findClosestLoop.bind(this);
  }

  componentDidMount() {
    console.log("sound" + this.props.sound);
    console.log("sounds" + this.props.sounds);
    this.colorHue = this.props.sounds.indexOf(this.props.sound);
    console.log("colorhue" + this.colorHue);
    this.color = colorHues[this.colorHue][this.props.octave * 100];
  }

  componentDidUpdate(prevProps) {
    if (prevProps.sound !== this.props.sound) {
      this.colorHue = this.props.sounds.indexOf(this.props.sound);
      this.color = colorHues[this.colorHue][this.props.octave * 100];
    }
    if (prevProps.octave !== this.props.octave) {
      this.colorHue = this.props.sounds.indexOf(this.props.sound);
      this.color = colorHues[this.colorHue][this.props.octave * 100];
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

      this.props.dispatch(
        updateTone(
          intervalId,
          this.color,
          this.props.sound + this.props.octave,

          //  this.props.screenHeight / 50,
          this.props.toneSizes[this.props.selectedSustain],
          this.props.selectedSustain
        )
      );
    }
  }

  handleClick() {
    // this.props.dispatch(makeInvisible());
    console.log("clicked");

    if (this.props.playing === false) {
      // this.rect = this.selector.current.getBoundingClientRect();
      const x = this.props.cursorPos.x - 200;
      const y = this.props.cursorPos.y - 150;

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
          // this.props.dispatch(updateTone(i, "transparent", null, 1.5));
        }
      }
    }
  }
  render() {
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
              110 -
              this.props.toneSizes[this.props.selectedSustain],
            width: 2 * this.props.toneSizes[this.props.selectedSustain],
            height: 2 * this.props.toneSizes[this.props.selectedSustain],

            borderRadius: "50%",
            pointerEvents: this.props.visible ? "auto" : "none",
            cursor: "grab ",
            background: this.props.visible ? this.color : "transparent"
          }}
        />
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    visible: state.cursor.active,
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
