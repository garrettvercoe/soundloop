import React from "react";
import "../styles/index.css";
import { Line, Layer, Circle } from "react-konva";
import { connect } from "react-redux";
import Konva from "konva";
import Tone from "tone";

class Cord extends React.Component {
  componentDidMount() {
    this.melodyPlayer = new Tone.PolySynth(3, Tone.SimpleSynth)
      .set({
        volume: 0,
        oscillator: {
          type: "triangle"
          // 'partials' : [16, 8, 4, 2, 1, 0.5, 1, 2]
        },
        envelope: {
          attack: 0.01,
          decay: 0.1,
          sustain: 0.2,
          release: 1.7
        }
      })
      .toMaster();

    this.melodyPlayer.stealVoices = false;

    var max = this.props.height / 2 - 75;
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
      this.props.sounds &&
      this.props.sounds.length > 0 &&
      prevProps.sounds !== this.props.sounds
    ) {
      if (!this.props.muted) {
        this.melodyPlayer.triggerAttackRelease(
          this.props.sounds[this.props.index].sound,
          this.props.sounds[this.props.index].duration,
          undefined,
          (Math.random() * 0.5 + 0.5) * 0.8
        );
      }

      if (this.props.playing) {
        // this.line.fill(this.props.color);

        this.tween.play();
      }
    }
  }

  render() {
    var cordLength = this.props.height / 2 - 75;
    var max = this.props.height / 2 - 75;
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
