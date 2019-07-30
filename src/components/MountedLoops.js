import React from "react";
import "../styles/index.css";
import { Layer } from "react-konva";

import { connect } from "react-redux";
import LoopKonva from "./LoopKonva";
import { addLoop, activateLoop } from "../actions/loops";

class MountedLoops extends React.Component {
  componentDidMount() {
    this.props.dispatch(addLoop(this.props.height / 3));
    this.props.dispatch(addLoop(this.props.height / 6));
    this.props.dispatch(addLoop(this.props.height / 12));
    this.props.dispatch(addLoop(this.props.height / 24));
    this.props.dispatch(addLoop(this.props.height / 48));
    this.props.dispatch(activateLoop(0));
  }

  render() {
    return (
      <Layer>
        {this.props.loops.map(function(item) {
          return (
            <LoopKonva radius={item.radius} id={item.id} stroke={item.stroke} />
          );
        })}
      </Layer>
    );
  }
}

function mapStateToProps(state) {
  return {
    loops: state.loops,
    center: state.shared.center,
    height: state.shared.screenHeight
  };
}

export default connect(mapStateToProps)(MountedLoops);
