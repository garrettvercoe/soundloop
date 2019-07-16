import React from "react";
import "../styles/index.css";
import { Layer } from "react-konva";

import { connect } from "react-redux";
import ToneKonva from "./ToneKonva";

class MountedTones extends React.Component {
  render() {
    return (
      <Layer>
        {this.props.tones.map(function(item) {
          return (
            <ToneKonva
              color={item.color}
              x={item.position.x}
              y={item.position.y}
              offset={item.offset}
              radius={item.radius}
              attachedLoop={item.attachedLoop}
            />
          );
        })}
      </Layer>
    );
  }
}

function mapStateToProps(state) {
  console.log(state); // state
  return {
    tones: state.tones
  };
}

export default connect(mapStateToProps)(MountedTones);
