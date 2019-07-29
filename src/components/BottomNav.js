import React from "react";
import "../styles/index.css";
import AppBar from "@material-ui/core/AppBar";
import PlayButton from "./PlayButton";
import MuteButton from "./MuteButton";
import TrashButton from "./TrashButton";
import Toolbar from "@material-ui/core/Toolbar";
import InstrumentSelect from "./InstrumentSelect";
import { connect } from "react-redux";

const NavStyleOuter = {
  position: "absolute",
  top: "auto",
  bottom: "2.5vh",
  height: "5rem",
  width: "100vw"
};

const ToolbarStyle = {
  top: "50%"
};

class BottomNav extends React.Component {
  render() {
    return (
      <div style={NavStyleOuter}>
        <div
          style={{
            width: "50vw",
            margin: `0 ${this.props.center - window.innerWidth / 4}px`,
            backgroundColor: "#fff",
            borderRadius: "100px",
            boxShadow:
              "0 20px 10px rgba(0,0,0,0.01), 0 6px 6px rgba(0,0,0,0.05)"
          }}
        >
          <Toolbar style={ToolbarStyle}>
            {/* <InstrumentSelect /> */}
            <PlayButton />
            <MuteButton />
            <TrashButton />
          </Toolbar>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    center: state.shared.center.x
  };
}
const ConnectedBottomNav = connect(mapStateToProps)(BottomNav);

export default ConnectedBottomNav;
