import React from "react";
import "../styles/index.css";
import { Layer } from "react-konva";

import { connect } from "react-redux";
import ToneKonva from "./ToneKonva";

class MountedTones extends React.Component {
  render() {
    return (
      <Layer>
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
            />
          );
        })}
      </Layer>
    );
  }
}

function mapStateToProps(state) {
  return {
    tones: state.tones,
    loops: state.loops,
    center: state.shared.center
  };
}

export default connect(mapStateToProps)(MountedTones);
