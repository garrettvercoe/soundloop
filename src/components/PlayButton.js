import React from "react";
import "../styles/index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle, faPauseCircle } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { togglePlay, toggleStop } from "../actions/shared";

const PlayButtonStyle = {
  color: "#692d55",
  position: "absolute",
  left: "50%"
};

class PlayButton extends React.Component {
  constructor(props) {
    super(props);
    this.spacePress = this.spacePress.bind(this);
  }

  componentWillMount() {
    document.addEventListener("keyup", this.spacePress);
  }

  spacePress(e) {
    if (e.keyCode === 32) {
      this.props.playing
        ? this.props.dispatch(toggleStop())
        : this.props.dispatch(togglePlay());
    }
  }
  render() {
    return (
      <React.Fragment>
        {this.props.playing ? (
          <FontAwesomeIcon
            className="inl-blk fa-3x"
            style={PlayButtonStyle}
            icon={faPauseCircle}
            onClick={() => this.props.dispatch(toggleStop())}
          />
        ) : (
          <FontAwesomeIcon
            className="inl-blk fa-3x"
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
  return {
    playing: state.shared.playing
  };
}

export default connect(mapStateToProps)(PlayButton);
