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
    var pts = [];
    var prevX = this.props.center.x;
    var flux = 8;
    var prevY = this.props.center.y;
    for (var i = 0; i < 3; i++) {
      pts.push(prevX);
      pts.push(prevY);
      prevX = prevX + flux;
      prevY = prevY - interval;
      flux = -flux;
    }

    //var tl = new TimelineLite();
    this.tween = new Konva.Tween({
      node: this.line,
      duration: 0.1,
      easing: Konva.Easings.EaseOut,
      points: pts,
      // points: [
      //   this.props.center.x,
      //   this.props.center.y,
      //   this.props.center.x + 10,
      //   this.props.center.y - 200,
      // this.props.center.x - 5,
      // this.props.center.y - 100,
      // this.props.center.x + 5,
      // this.props.center.y - 150,
      // this.props.center.x - 5,
      // this.props.center.y - 200,
      // this.props.center.x + 5,
      // this.props.center.y - 250,
      // this.props.center.x - 5,
      // this.props.center.y - 300,
      // this.props.center.x + 5,
      // this.props.center.y - 350,
      //   this.props.center.x,
      //   this.props.center.y - 400
      // ],
      onFinish: function() {
        // for (var i = 0; i < 18; i += 2){
        //   this.tween.points[i] = -this.tween.points[i];
        // }
        this.tween.reverse();
      }
      //   onReset: function() {
      //     this.tween.play();
      // }
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.sounds !== this.props.sounds) {
      this.synth.triggerAttackRelease(
        this.props.sounds[this.props.index],
        "4n"
      );

      if (this.props.playing) {
        this.tween.play();
      }

      //console.log("CDU Tween points: " + this.tween.points)
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
        <Line
          points={pts}
          //   points={[
          //     this.props.center.x,
          // this.props.center.y,
          // this.props.center.x,
          // this.props.center.y - 50,
          // this.props.center.x + 5,
          // this.props.center.y - 100,
          // this.props.center.x - 5,
          // this.props.center.y - 150,
          // this.props.center.x + 5,
          // this.props.center.y - 200,
          // this.props.center.x - 5,
          // this.props.center.y - 250,
          // this.props.center.x + 5,
          // this.props.center.y - 300,
          // this.props.center.x - 5,
          // this.props.center.y - 350,
          // this.props.center.x,
          // this.props.center.y - 400
          // ]}
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
