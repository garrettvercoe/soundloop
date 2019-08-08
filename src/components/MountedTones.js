import React from "react";
import "../styles/index.css";
import { Layer, Group } from "react-konva";
import Konva from "konva";
import { connect } from "react-redux";
import ToneKonva from "./ToneKonva";

class MountedTones extends React.Component {
  // componentDidMount(){
  //   // would need to get angular speed of loop somehow
  //   this.angularSpeed = 70;
  //   this.anim = new Konva.Animation(frame => {
  //     var tDiff = frame.timeDiff;
  //     var angleDiff = (tDiff * this.angularSpeed) / 1000;
  //     // rotate group0
  //     this.group0.rotate(angleDiff);
  //     this.trueTime = frame.time - this.lastTime;

  //   }, this.group1.getLayer());
  // }

  // componentDidUpdate(prevProps){
  //   if (prevProps.tones !== this.props.tones){
  //   }
  //   if (prevProps.playing !== this.props.playing) {
  //     if (this.props.playing) {
  //       this.anim.start();
  //     } else {
  //       this.anim.isRunning() && this.anim.stop();
  //     }
  //   }
  // }

  render() {
    // filter tones by loop to be added to group
    const loop0 = this.props.tones.filter(item => item.attachedLoop === 0)
    const loop1 = this.props.tones.filter(item => item.attachedLoop === 1)
    return (
      <Layer ref={node => { this.layer = node; }}>
        {this.props.tones.map(item => {
          return (
            <ToneKonva
              color={item.color}
              x={this.props.center.x}
              y={this.props.center.y}
              offset={item.offset}
              radius={item.radius}
              attachedLoop={item.attachedLoop}
              sound={item.sound}
              duration={item.duration}
              strokeWidth={item.strokeWidth}
              id={item.id}
              rotation={item.rotation}
              ref={node => { this.child = node; }}
            />
          );
        })}
        {/* The following is the group implementation, need to add position and other props to each */}
        {/* <Group ref={node => { this.group0 = node; }}>
        {loop0.map(item => {
          return (
            <ToneKonva
              color={item.color}
              x={this.props.center.x}
              y={this.props.center.y}
              offset={item.offset}
              radius={item.radius}
              attachedLoop={item.attachedLoop}
              sound={item.sound}
              duration={item.duration}
              strokeWidth={item.strokeWidth}
              id={item.id}
              rotation={item.rotation}
              ref={node => { this.child = node; }}
            />
          );
        })}
        </Group>
        <Group ref={node => { this.group1 = node; }}>
        {loop1.map(item => {
          return (
            <ToneKonva
              color={item.color}
              x={this.props.center.x}
              y={this.props.center.y}
              offset={item.offset}
              radius={item.radius}
              attachedLoop={item.attachedLoop}
              sound={item.sound}
              duration={item.duration}
              strokeWidth={item.strokeWidth}
              id={item.id}
              rotation={item.rotation}
              ref={node => { this.child = node; }}
            />
          );
        })}
        </Group> */}
      </Layer>
    );
      // } else {
      //   return null
      // }
  }
}

function mapStateToProps(state) {
  return {
    tones: state.tones,
    loops: state.loops,
    center: state.shared.center,
    playing: state.shared.playing
  };
}

export default connect(mapStateToProps)(MountedTones);
