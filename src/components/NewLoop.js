import React from "react";
import "../styles/index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import LoopKonva from "./LoopKonva";
import { addLoop } from "../actions/loops";

class NewLoop extends React.Component {
  handleClick = () => {
    var loopArray = this.props.loops;
    //loopArray[loopArray.length].radius-50
    this.props.dispatch(addLoop(loopArray[loopArray.length - 1].radius / 2));
  };
  render() {
    return (
      <React.Fragment>
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
    loops: state.loops
  };
}

export default connect(mapStateToProps)(NewLoop);
