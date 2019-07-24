import React from "react";
import "../styles/index.css";
import AppBar from "@material-ui/core/AppBar";
import PlayButton from "./PlayButton";
import { Line, Layer, Circle } from "react-konva";
import Toolbar from "@material-ui/core/Toolbar";
import { connect } from "react-redux";
import Konva from "konva";
import Tone from "tone";

class Cord extends React.Component {
  componentDidMount() {
    //playing around with creating a sound

    //create a synth and connect it to the master output (your speakers)
    // var distortion = new Tone.Distortion(1.5);
    // var tremolo = new Tone.Tremolo().start();
    // this.synth = new Tone.PolySynth().chain(distortion, tremolo, Tone.Master);

    this.synth = new Tone.PolySynth().toMaster();
    var cordLength = window.innerHeight / 2 - 50;
    // modify this to change number of waves
    var numAnchors = 1;
    var interval = cordLength / (numAnchors+1);
    var pts = [];
    var prevX = this.props.center.x;
    var oscill = 8;
    var prevY = this.props.center.y;
    for (var i = 0; i < numAnchors+2; i++) {
      pts.push(prevX);
      pts.push(prevY);
      prevX = prevX + oscill;
      prevY = prevY - interval;
      oscill = -oscill;
    }

    this.tween = new Konva.Tween({
      node: this.line,
      duration: 0.1,
      easing: Konva.Easings.EaseOut,
      points: pts,
      // stroke: "#fff",
      onFinish: function() {
        this.tween.reverse();
      }
      //   onReset: function() {
      //     this.tween.play();
      // }
    });
  }

  componentDidUpdate(prevProps) {
    console.log("INDEX: " + this.props.index)
    console.log("COLOR: " + this.props.color)
    console.log("SOUND 2: " + this.props.sounds[this.props.index])
    // check if sound at index is null
    if (prevProps.sounds !== this.props.sounds) {
      this.synth.triggerAttackRelease(
        this.props.sounds[this.props.index],
        "4n"
      );
      this.tween.play();
    }
  }

  render() {
    var cordLength = window.innerHeight / 2 - 50;
    return (
      <Layer>
        <Circle
          x={this.props.center.x}
          y={this.props.center.y - cordLength}
          radius={4}
          fill="#692D55"
        />
        <Circle
          x={this.props.center.x}
          y={this.props.center.y}
          radius={11}
          fill="#692D55"
        />
        <Line
          points={[
            this.props.center.x,
            this.props.center.y,
            this.props.center.x,
            this.props.center.y - cordLength
          ]}
          stroke="#692D55"
          strokeWidth={2}
          tension={0.5}
          ref={node => {
            this.line = node;
          }}
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
    index: state.cord.index
  };
}

export default connect(mapStateToProps)(Cord);
