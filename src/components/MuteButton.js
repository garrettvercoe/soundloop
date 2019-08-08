import React from "react";
import "../styles/index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeMute, faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { toggleMute, toggleUnmute } from "../actions/shared";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";
import VolumeOff from "@material-ui/icons/VolumeOff";
import VolumeUp from "@material-ui/icons/VolumeUp";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { updateVolume } from "../actions/shared";
// const MuteButtonStyle = {
//   color: "#692d55",
//   position: "relative",
//   margin: "0 auto 0 0 "
// };

const VolButton = {
  color: "#692d55",
  position: "relative"
};

const VolumeSlider = withStyles({
  root: {
    color: "#692D54",
    height: 2
  },
  thumb: {
    width: 15,
    height: 15,
    "&:focus,&:hover,&$active": {
      boxShadow:
        "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)",

      backgroundColor: "#692D54"

      // Reset on touch devices, it doesn't add specificity
    }
  },
  // active: {},
  track: {
    height: 4,
    borderRadius: 4
  },
  rail: {
    height: 4,
    borderRadius: 4
  }
})(Slider);
class MuteButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 100, beforeMuteVal: 100 };
    this.handleChange = this.handleChange.bind(this);
    this.handleMute = this.handleMute.bind(this);
    this.handleUnmute = this.handleUnmute.bind(this);
  }
  handleChange(event, newValue) {
    if (newValue === 0) {
      this.props.dispatch(toggleMute());
    } else if (this.state.value === 0 && newValue !== 0) {
      this.props.dispatch(toggleUnmute());
    }
    this.props.dispatch(updateVolume(newValue));
    this.setState({ value: newValue });
  }

  handleMute() {
    this.props.dispatch(toggleMute());
    this.setState({ beforeMuteVal: this.state.value, value: 0 });
  }

  handleUnmute() {
    this.props.dispatch(toggleUnmute());
    this.setState({ value: this.state.beforeMuteVal });
  }

  render() {
    return (
      <div
        style={{
          display: "inline-block",
          position: "relative",
          marginRight: "0",
          marginLeft: "auto",

          color: "#692d55"
        }}
      >
        {this.props.muted ? (
          <VolumeOff style={VolButton} onClick={() => this.handleUnmute()} />
        ) : (
          <VolumeUp style={VolButton} onClick={() => this.handleMute()} />
        )}
        <div
          style={{
            paddingLeft: "0.5rem",
            paddingRight: "0.5rem",
            width: "100px",
            display: "inline-block"
          }}
        >
          <VolumeSlider
            defaultValue={50}
            value={this.state.value}
            onChange={this.handleChange}
            aria-labelledby="continuous-slider"
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    muted: state.shared.muted,
    volume: state.shared.volume
  };
}

export default connect(mapStateToProps)(MuteButton);
