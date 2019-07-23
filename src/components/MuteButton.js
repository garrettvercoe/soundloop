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
// const MuteButtonStyle = {
//   color: "#692d55",
//   position: "relative",
//   margin: "0 auto 0 0 "
// };
const PrettoSlider = withStyles({
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
    this.state = { value: 50 };
    console.log("state: " + JSON.stringify(this.state));
    console.log("props " + JSON.stringify(this.props));
    this.handleChange = this.handleChange.bind(this);
    this.handleMute = this.handleMute.bind(this);
    this.handleUnmute = this.handleUnmute.bind(this);
  }
  handleChange(event, newValue) {
    if (newValue === 0) {
      console.log("lets mute");
      this.props.dispatch(toggleMute());
    } else if (this.state.value === 0 && newValue !== 0) {
      console.log("lets unmute");
      this.props.dispatch(toggleUnmute());
    }
    this.setState({ value: newValue });
  }
  handleMute() {
    this.props.dispatch(toggleMute());
    this.setState({ value: 0 });
  }

  handleUnmute() {
    this.props.dispatch(toggleUnmute());
    this.setState({ value: 50 });
  }

  render() {
    return (
      <div>
        {this.props.muted ? (
          <VolumeOff onClick={() => this.handleUnmute()} />
        ) : (
          <VolumeUp onClick={() => this.handleMute()} style={{}} />
        )}

        <div
          style={{
            paddingLeft: "0.5rem",
            width: "100px",
            float: "right",
            color: "#692d55"
          }}
        >
          <PrettoSlider
            defaultValue={50}
            value={this.state.value}
            onChange={this.handleChange}
            aria-labelledby="continuous-slider"
          />{" "}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    muted: state.shared.muted
  };
}

export default connect(mapStateToProps)(MuteButton);
