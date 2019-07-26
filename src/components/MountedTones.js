import React from "react";
import "../styles/index.css";
import { Layer } from "react-konva";

import { connect } from "react-redux";
import ToneKonva from "./ToneKonva";

class MountedTones extends React.Component {
  // componentDidUpdate(){
  //   console.log("CHECK: " + JSON.stringify(this.props.tones))
  // }

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
              sound={item.sound}
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
  console.log(state); // state
  return {
    tones: state.tones,
    loops: state.loops
  };
}

export default connect(mapStateToProps)(MountedTones);
