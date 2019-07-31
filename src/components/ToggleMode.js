import React from "react";
import "../styles/index.css";

import { connect } from "react-redux";

import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { toggleMode, trashAll } from "../actions/shared";
class ToggleMode extends React.Component {
  handleClick = (event, newVal) => {
    if (newVal !== null) {
      console.log("being passed: " + newVal);
      if (newVal !== this.props.mode) {
        this.props.dispatch(trashAll());
      }
      this.props.dispatch(toggleMode(newVal));
    }
  };
  render() {
    return (
      <React.Fragment>
        <br />
        <ToggleButtonGroup
          value={this.props.mode}
          exclusive
          onChange={this.handleClick}
        >
          <ToggleButton value="angular">Angular</ToggleButton>
          <ToggleButton value="linear">Linear</ToggleButton>
        </ToggleButtonGroup>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    mode: state.shared.mode
  };
}

export default connect(mapStateToProps)(ToggleMode);
