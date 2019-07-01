import React from "react";
import "../styles/index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle, faPauseCircle } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { togglePlay, toggleStop } from "../actions/shared";

const PlayButtonStyle = {
  color: "#692d55",
  position: "relative",
  paddingLeft: "45rem"
};

class PlayButton extends React.Component {
  render() {
    return (
      <React.Fragment>
        {this.props.playing ? (
          <FontAwesomeIcon
            className="inl-blk fa-4x"
            style={PlayButtonStyle}
            icon={faPauseCircle}
            onClick={() => this.props.dispatch(toggleStop())}
          />
        ) : (
          <FontAwesomeIcon
            className="inl-blk fa-4x"
            style={PlayButtonStyle}
            icon={faPlayCircle}
            onClick={() => this.props.dispatch(togglePlay())}
          />
        )}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  console.log(state); // state
  return {
    playing: state.shared.playing
  };
}

export default connect(mapStateToProps)(PlayButton);
