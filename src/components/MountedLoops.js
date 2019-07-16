import React from "react";
import "../styles/index.css";
import { Layer } from "react-konva";

import { connect } from "react-redux";
import LoopKonva from "./LoopKonva";
import { addLoop } from "../actions/loops";

class MountedLoops extends React.Component {
    componentDidMount(){
        this.props.dispatch(addLoop(window.innerHeight/3));
    }

    render() {
        return ( 
            <Layer>
            {this.props.loops.map(function(item) {
                return (
                    <LoopKonva radius={item.radius}/>
                );
            })}
            </Layer>
    );
  }
}

function mapStateToProps(state) {
  console.log(state); // state
  return {
    loops: state.loops
  };
}

export default connect(mapStateToProps)(MountedLoops);
