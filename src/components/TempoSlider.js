import React from "react";
import { updateTempo } from "../actions/shared";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import { faRunning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";

const TempoSlider = withStyles({
  root: {
    color: "#692D54",
    height: 0
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

const TempoIconStyle = {
  color: "#692d55"
};

class Tempo extends React.Component {
  constructor(props) {
    super(props);
    this.handleTempoChange = this.handleTempoChange.bind(this);
  }

  handleTempoChange(event, newValue) {
    this.props.dispatch(updateTempo(newValue));
  }
  render() {
    return (
      <React.Fragment>
        <FontAwesomeIcon
          icon={faRunning}
          style={TempoIconStyle}
          className="inl-blk fa-lg"
        />
        <div
          style={{
            padding: "0 1rem",
            display: "inline-block",
            width: "125px",
            alignItems: "center",
            color: "#692d55"
          }}
        >
          <TempoSlider
            defaultValue={110}
            onChange={this.handleTempoChange}
            aria-labelledby="continuous-slider"
            valueLabelDisplay="off"
            min={55}
            max={220}
            step={1}
            disabled={!this.props.playing ? false : true}
          />
        </div>
        <h3 className="light " style={{ display: "inline-block" }}>
          {this.props.tempo}
        </h3>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    tempo: state.shared.tempo,
    playing: state.shared.playing
  };
}
const ConnectedTempo = connect(mapStateToProps)(Tempo);

export default ConnectedTempo;
