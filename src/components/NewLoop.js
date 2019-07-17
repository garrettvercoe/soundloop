import React from "react";
import "../styles/index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import LoopKonva from "./LoopKonva";
import { addLoop } from "../actions/loops";

class NewLoop extends React.Component{
    handleClick = () => {
        
        var loopArray = this.props.loops;
        if (loopArray.length < 5){
        //loopArray[loopArray.length].radius-50
        this.props.dispatch(addLoop(loopArray[loopArray.length-1].radius/2));
        }
    };
    render(){
        return(
            <React.Fragment>
            <FontAwesomeIcon
                className="plus-icon inl-blk fa-lg"
                icon={faPlusCircle}
                onClick={this.handleClick}
                style={{
                    position: "absolute",
                    top: "80%",
                    left: "80%"
                }}
            />
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    console.log(state); // state
    return {
      loops: state.loops
    };
  }

export default connect(mapStateToProps)(NewLoop)