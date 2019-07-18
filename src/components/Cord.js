import React from "react";
import "../styles/index.css";
import AppBar from "@material-ui/core/AppBar";
import PlayButton from "./PlayButton";
import { Line, Layer, Circle } from "react-konva";
import Toolbar from "@material-ui/core/Toolbar";
import { connect } from "react-redux";
import Konva from "konva";
import Tone from "tone";
//import GreenSock from "greensock-plugin-master"

class Cord extends React.Component {
  componentDidMount() {
    //playing around with creating a sound

    //create a synth and connect it to the master output (your speakers)
    // var distortion = new Tone.Distortion(1.5);
    // var tremolo = new Tone.Tremolo().start();
    // this.synth = new Tone.PolySynth().chain(distortion, tremolo, Tone.Master);

    this.synth = new Tone.PolySynth().toMaster();

    var max = window.innerHeight / 2 - 50;
    var interval = max / 2;
    this.pts = [];
    var prevX = this.props.center.x;
    var flux = 8;
    var prevY = this.props.center.y;
    for (var i = 0; i < 3; i++) {
      this.pts.push(prevX);
      this.pts.push(prevY);
      prevX = prevX + flux;
      prevY = prevY - interval;
      flux = -flux;
    }
    //var tl = new TimelineLite();
  }

  componentDidUpdate(prevProps) {
    this.tween = new Konva.Tween({
      node: this.line,
      duration: 0.1,
      easing: Konva.Easings.EaseOut,
      points: this.pts,
      //stroke: this.line.fill(),
      onFinish: function() {
        this.tween.reverse();
      }
      // onReset: function() {
      //   this.line.stroke("#692D55");
      // }
    });
    if (prevProps.sounds !== this.props.sounds) {
      this.synth.triggerAttackRelease(
        this.props.sounds[this.props.index],
        "4n"
      );

      if (this.props.playing) {
        // this.line.fill(this.props.color);

        this.tween.play();
      }
    }
  }

  render() {
    var max = window.innerHeight / 2 - 50;
    var interval = max / 2;
    var pts = [];
    var prevX = this.props.center.x;
    var prevY = this.props.center.y;
    for (var i = 0; i < 3; i++) {
      pts.push(prevX);
      pts.push(prevY);
      prevY = prevY - interval;
    }
    return (
      <Layer>
        <Line
          points={pts}
          stroke="#692D55"
          strokeWidth={2}
          tension={0.5}
          ref={node => {
            this.line = node;
          }}
        />
        <Circle
          x={this.props.center.x}
          y={this.props.center.y - max}
          radius={4}
          fill="#692D55"
        />
        <Circle
          x={this.props.center.x}
          y={this.props.center.y}
          radius={11}
          fill="#692D55"
        />
      </Layer>
    );
  }
}

function mapStateToProps(state) {
  return {
    center: state.shared.center,
    playing: state.shared.playing,
    sounds: state.cord.sounds,
    color: state.cord.color,
    index: state.cord.index
  };
}

export default connect(mapStateToProps)(Cord);
