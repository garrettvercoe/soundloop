import React from "react";
import "../styles/index.css";
import { Layer } from "react-konva";

import { connect } from "react-redux";
import LoopKonva from "./LoopKonva";
import { addLoop, activateLoop } from "../actions/loops";

class MountedLoops extends React.Component {
    componentDidMount(){
        this.props.dispatch(addLoop(window.innerHeight/3));
        this.props.dispatch(activateLoop(0));
        this.props.dispatch(addLoop(window.innerHeight/6));
        this.props.dispatch(addLoop(window.innerHeight/12));
        this.props.dispatch(addLoop(window.innerHeight/24));
        this.props.dispatch(addLoop(window.innerHeight/48));
    }

    render() {
        return ( 
            <Layer>
            {this.props.loops.map(function(item) {
                return (
                    <LoopKonva radius={item.radius} id={item.id} stroke={item.stroke}/>
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
