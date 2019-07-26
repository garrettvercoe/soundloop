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
        <br />

        <div className="tone-add" onClick={this.handleClick}>
          <FontAwesomeIcon
            className="plus-icon inl-blk fa-lg"
            icon={faPlusCircle}
          />

          <h3 className="light inl-blk">ADD LOOP</h3>
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
