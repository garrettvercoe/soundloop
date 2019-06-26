import React from "react";
import "../styles/index.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle, faPauseCircle } from "@fortawesome/free-solid-svg-icons";

const NavStyle = {
  top: "auto",
  bottom: 0,
  height: "6rem",
  boxShadow: "0 20px 10px rgba(0,0,0,1), 2px 6px 6px rgba(0,0,0,1)"
};

const ToolbarStyle = {
  top: "50%",
  transform: "translateY(-50%)"
};

const PlayButtonStyle = {
  color: "#692d55",
  position: "relative",
  paddingLeft: "45rem"
};

class PlayButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { playing: false };

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
  }

  start() {
    this.setState({ playing: true });
  }

  stop() {
    this.setState({ playing: false });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.playing ? (
          <FontAwesomeIcon
            className="inl-blk fa-4x"
            style={PlayButtonStyle}
            icon={faPauseCircle}
            onClick={this.stop}
          />
        ) : (
          <FontAwesomeIcon
            className="inl-blk fa-4x"
            style={PlayButtonStyle}
            icon={faPlayCircle}
            onClick={this.start}
          />
        )}
      </React.Fragment>
    );
  }
}

export default class BottomNav extends React.Component {
  render() {
    return (
      <AppBar style={NavStyle} position="fixed" color="white">
        <Toolbar style={ToolbarStyle}>
          <PlayButton style={PlayButtonStyle} color={"#692d55"} />
        </Toolbar>
      </AppBar>
    );
  }
}
