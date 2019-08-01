import React from "react";
import "../styles/index.css";

import { connect } from "react-redux";

import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { toggleMode, trashAllLinear, trashAllAngular } from "../actions/shared";
class ToggleMode extends React.Component {
  // mode is then checked in ToneKonva, LoopKonva
  handleClick = (event, newVal) => {
    if (newVal !== null && !this.props.playing) {
      console.log("being passed: " + newVal);
      if (newVal !== this.props.mode) {
        if (newVal === "angular") {
          this.props.dispatch(toggleMode(newVal));
          this.props.dispatch(trashAllAngular());
        } else {
          this.props.dispatch(toggleMode(newVal));
          this.props.dispatch(trashAllLinear());
        }
      }
    }
  };
  render() {
    return (
      <React.Fragment>
        <br />
        <h3 className="light inl-blk">
          WARNING: Switching modes will reset your SoundLoop!{" "}
        </h3>
        <br />
        <ToggleButtonGroup value={this.props.mode} exclusive onChange={this.handleClick}>
          <ToggleButton value="angular">Angular</ToggleButton>
          <ToggleButton value="linear">Linear</ToggleButton>
        </ToggleButtonGroup>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    mode: state.shared.mode,
    playing: state.shared.playing
  };
}

export default connect(mapStateToProps)(ToggleMode);
