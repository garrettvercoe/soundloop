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
    // var distortion = new Tone.Distortion(3.5);
    // var tremolo = new Tone.Tremolo().start();
    // this.synth = new Tone.Synth().chain(distortion, tremolo, Tone.Master);

    this.synth = new Tone.Synth().toMaster();

    this.tween = new Konva.Tween({
      node: this.line,
      points: [
        this.props.center.x,
        this.props.center.y,
        this.props.center.x + 5,
        this.props.center.y - 50,
        this.props.center.x - 8,
        this.props.center.y - 100,
        this.props.center.x + 10,
        this.props.center.y - 150,
        this.props.center.x - 12,
        this.props.center.y - 200,
        this.props.center.x + 12,
        this.props.center.y - 250,
        this.props.center.x - 10,
        this.props.center.y - 300,
        this.props.center.x + 5,
        this.props.center.y - 350,
        this.props.center.x,
        this.props.center.y - 400
      ],
      onFinish: function() {
        this.tween.reverse();
      }
      //   onReset: function() {
      //     this.tween.play();
      //   }
    });

    if (this.props.playing) {
      this.tween.play();
    }
  }

  playTween() {}

  componentDidUpdate(prevProps) {
    if (prevProps.sounds !== this.props.sounds) {
      this.synth.triggerAttackRelease(
        this.props.sounds[this.props.index],
        "4n"
      );
      this.tween.play();
    }
  }

  render() {
    return (
      <Layer>
        <Circle
          x={this.props.center.x}
          y={this.props.center.y - 400}
          radius={4}
          fill="#692D55"
        />
        <Circle
          x={this.props.center.x}
          y={this.props.center.y}
          radius={15}
          fill="#692D55"
        />
        <Line
          points={[
            this.props.center.x,
            this.props.center.y,
            this.props.center.x - 5,
            this.props.center.y - 50,
            this.props.center.x + 8,
            this.props.center.y - 100,
            this.props.center.x - 10,
            this.props.center.y - 150,
            this.props.center.x + 12,
            this.props.center.y - 200,
            this.props.center.x - 12,
            this.props.center.y - 250,
            this.props.center.x + 10,
            this.props.center.y - 300,
            this.props.center.x - 5,
            this.props.center.y - 350,
            this.props.center.x,
            this.props.center.y - 400
          ]}
          stroke="#692D55"
          strokeWidth={3}
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
