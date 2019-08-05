import React from "react";
import "../styles/index.css";
import { Line, Layer, Circle } from "react-konva";
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

    //some overall compression to keep the levels in check
    // var masterCompressor = new Tone.Compressor({
    //   threshold: -6,
    //   ratio: 3,
    //   attack: 0.5,
    //   release: 0.1
    // });
    // //give a little boost to the lows
    // var lowBump = new Tone.Filter(200, "lowshelf");
    //route everything through the filter
    //and compressor before going to the speakers

    // Tone.Master.chain(lowBump, masterCompressor);

    this.synth = new Tone.PolySynth(4, Tone.Synth).toMaster();

    var max = this.props.height / 2 - 50;
    var interval = max / 2;
    this.pts = [];
    var flux = 8;
    var prevX = this.props.center.x;
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
    if (this.props.playing) {
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
    } else {
      if (prevProps.playing !== this.props.playing) {
      }
    }

    if (this.props.volume !== prevProps.volume) {
      Tone.Master.volume.value = this.props.volume;
    }
    if (
      this.props.sounds.length > 0 &&
      prevProps.sounds !== this.props.sounds
    ) {
      if (!this.props.muted) {
        this.synth.triggerAttackRelease(
          this.props.sounds[this.props.index].sound,
          this.props.sounds[this.props.index].duration
        );
      }

      if (this.props.playing) {
        // this.line.fill(this.props.color);

        this.tween.play();
      }
    }
  }

  render() {
    var cordLength = this.props.height / 2 - 50;
    var max = this.props.height / 2 - 50;
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
      </Layer>
    );
  }
}

function mapStateToProps(state) {
  return {
    center: state.shared.center,
    playing: state.shared.playing,
    muted: state.shared.muted,
    sounds: state.cord.sounds,
    color: state.cord.color,
    index: state.cord.index,
    height: state.shared.screenHeight,
    volume: state.shared.volume
  };
}

export default connect(mapStateToProps)(Cord);
