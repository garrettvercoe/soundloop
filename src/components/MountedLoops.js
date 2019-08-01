import React from "react";
import "../styles/index.css";
import { Layer } from "react-konva";

import { connect } from "react-redux";
import LoopKonva from "./LoopKonva";
import { addLoop, activateLoop } from "../actions/loops";

class MountedLoops extends React.Component {
  componentDidMount() {

    // if mode true then dispatch this way
    if (this.props.mode==="angular"){
      var interval = this.props.centerY/7.5
      for (var i = 0; i < 5; i++){
        this.props.dispatch(addLoop((window.innerHeight / 3) - (interval * i)))
      }
    } else {
      this.props.dispatch(addLoop(window.innerHeight / 3));
      this.props.dispatch(addLoop(window.innerHeight / 6));
      this.props.dispatch(addLoop(window.innerHeight / 12));
      this.props.dispatch(addLoop(window.innerHeight / 24));
      this.props.dispatch(addLoop(window.innerHeight / 48));
    }
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
    centerY: state.shared.center.y,
    mode: state.shared.mode,
    center: state.shared.center,
    height: state.shared.screenHeight
  };
}

export default connect(mapStateToProps)(MountedLoops);
