import React from "react";
import "../styles/index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import LoopKonva from "./LoopKonva";
import { addLoop, updateLoop, activateLoop } from "../actions/loops";

const contentContainer = { padding: "1rem 0  0 2rem" };

class NewLoop extends React.Component {
  handleClick = () => {
    var loopArray = this.props.loops;
    var lastLoop = 1;
    //loopArray[loopArray.length].radius-50
    // this.props.dispatch(addLoop(loopArray[loopArray.length - 1].radius / 2));

    // for (var i = 0; i < this.props.loops.length; i++){
    //   if (this.props.loops[i].active === false){
    //     this.props.dispatch(activateLoop(i))
    //   }
    // }

    this.props.dispatch(activateLoop(this.props.loopCount));
    lastLoop++;
  };
  render() {
    return (
      <React.Fragment>
        <div
          className="tone-add"
          style={{
            position: "absolute",
            top: "57%",
            left: "5%",
            width: "15rem",
            height: "5rem",
            backgroundColor: "#fff",
            borderRadius: "1%",
            boxShadow:
              "0 20px 10px rgba(0,0,0,0.01), 0 6px 6px rgba(0,0,0,0.05)"
          }}
          onClick={this.handleClick}
        >
          <div style={contentContainer}>
            <h3 className="light inl-blk">ADD LOOP</h3>
            <FontAwesomeIcon
              className="plus-icon inl-blk fa-lg"
              icon={faPlusCircle}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  console.log(state); // state
  return {
    loops: state.loops,
    loopCount: state.shared.loopCount
  };
}

export default connect(mapStateToProps)(NewLoop);
