import React from "react";
import "../styles/index.css";
import { Circle, Layer } from "react-konva";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import Portal from "./Portal";
import { connect } from "react-redux";
import Konva from "konva";
import { addTone } from "../actions/tones";

class ToneKonva extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDragging: false,
      // x: window.innerWidth / 2,
      // y: window.innerHeight / 2,
      active: false
    };
    this.getAngle = this.getAngle.bind(this);
  }

  getAngle() {
    var radius = (window.innerHeight * (2 / 3)) / 2;
    console.log("radius is: " + radius);

    var x1 = this.props.x - this.props.offset.x;
    var y1 = this.props.y + this.props.offset.y;
    var x2 = this.props.x;
    var y2 = this.props.y + radius;
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
    var angularSpeed = this.props.loops[this.props.attachedLoop].speed;
    //var angularSpeed = 75;
    var angle = this.getAngle();
    var timerInit = ((360 - (angle % 360)) / angularSpeed) * 1000;

    var timerLoop = (360 / angularSpeed) * 1000;
    console.log("timer init: " + timerInit);
    console.log("timer loop: " + timerLoop);
    var played = false;

    this.anim = new Konva.Animation(frame => {
      var angleDiff = (frame.timeDiff * angularSpeed) / 1000;
      this.circle.rotate(angleDiff);

      if (
        !played &&
        timerInit - 10 < frame.time &&
        frame.time < timerInit + 10
      ) {
        this.circle.fill("#fff");
        played = true;
      } else if (
        played &&
        frame.time % timerLoop < timerInit + 20 &&
        frame.time % timerLoop > timerInit
      ) {
        console.log("checking");
        this.circle.fill("#fff");
      } else {
        this.circle.fill(this.props.color);
      }
    }, this.circle.getLayer());
    if (this.props.playing) {
      this.anim.start();
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.playing !== this.props.playing) {
      if (this.props.playing) {
        this.anim.start();
      } else {
        this.anim.isRunning() && this.anim.stop();
      }
    }
  }

  render() {
    return (
      <Circle
        x={this.props.x}
        y={this.props.y}
        // draggable
        fill={this.props.color}
        radius={this.props.radius}
        offset={this.props.offset}
        ref={node => {
          this.circle = node;
        }}
        onDragStart={() => {
          this.setState({
            isDragging: true
          });
        }}
        onDragEnd={e => {
          this.setState({
            isDragging: false,
            x: e.target.x(),
            y: e.target.y()
          });
        }}
      />
    );
  }
}

function mapStateToProps(state) {
  console.log(state); // state
  return {
    playing: state.shared.playing,
    loops: state.loops
  };
}

export default connect(mapStateToProps)(ToneKonva);
