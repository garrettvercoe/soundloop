import React from "react";
import "../styles/index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faArrowCircleDown,
  faArrowCircleUp
} from "@fortawesome/free-solid-svg-icons";
import UploadPopUp from "./UploadPopUp";
import { connect } from "react-redux";
import LoopKonva from "./LoopKonva";
import { addLoop } from "../actions/loops";

class NewLoop extends React.Component {
  handleClick = () => {};
  render() {
    return (
      <React.Fragment>
        <div className="tone-add" onClick={this.handleClick}>
          <UploadPopUp />
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    loops: state.loops
  };
}

export default connect(mapStateToProps)(NewLoop);
