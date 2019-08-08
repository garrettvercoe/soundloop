import React from "react";
import "../styles/index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import {
  addLoop,
  updateLoop,
  activateLoop,
  deactivateLoop
} from "../actions/loops";

const contentContainer = { padding: "1rem 0  0 2rem" };

class NewLoop extends React.Component {
  handlePlusClick = () => {
    // if loopCount is less than 5
    // if (this.props.loopCount < 5) {
    //   this.props.dispatch(activateLoop(this.props.loopCount));
    // }
    var recent = 0;
    for (var i = this.props.loops.length - 1; i > 0; i--) {
      if (!this.props.loops[i].active) {
        console.log(i + " is inactive");
        recent = i;
      }
    }
    this.props.dispatch(activateLoop(recent));
  };
  handleMinusClick = () => {
    // if loopCount is less than 5
    // if (this.props.loopCount > 1) {
    //   this.props.dispatch(deactivateLoop(this.props.loopCount-1));
    // }
    var recent = 0;
    for (var i = 0; i < this.props.loops.length; i++) {
      if (this.props.loops[i].active) {
        console.log(i + " is active");
        recent = i;
      }
    }
    if (recent !== 0) {
      this.props.dispatch(deactivateLoop(recent));
    }
  };
  render() {
    return (
      <React.Fragment>
        <hr />

        <div>
          <FontAwesomeIcon
            className="minus-icon inl-blk fa-lg "
            icon={faMinusCircle}
            onClick={this.handleMinusClick}
          />

          <FontAwesomeIcon
            className="plus-icon inl-blk fa-lg"
            icon={faPlusCircle}
            onClick={this.handlePlusClick}
          />
          <h3 className="light inl-blk ">LOOP</h3>
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    loops: state.loops,
    loopCount: state.shared.loopCount
  };
}

export default connect(mapStateToProps)(NewLoop);
