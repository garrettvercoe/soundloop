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
  componentDidMount() {
    var angularSpeed = 75;
    this.anim = new Konva.Animation(frame => {
      var angleDiff = (frame.timeDiff * angularSpeed) / 1000;
      this.circle.rotate(angleDiff);
    }, this.circle.getLayer());
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

  constructor(props) {
    super(props);
    this.state = {
      isDragging: false,
      // x: window.innerWidth / 2,
      // y: window.innerHeight / 2,
      active: false
    };
  }

  render() {
    return (
      <Circle
        x={this.props.x}
        y={this.props.y}
        // draggable
        fill={this.props.color}
        radius={16}
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
    playing: state.shared.playing
  };
}

export default connect(mapStateToProps)(ToneKonva);
