import React from "react";
import "../styles/index.css";
import AppBar from "@material-ui/core/AppBar";
import PlayButton from "./PlayButton";
import Toolbar from "@material-ui/core/Toolbar";

import { connect } from "react-redux";

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

class BottomNav extends React.Component {
  render() {
    return (
      <AppBar style={NavStyle} position="fixed" color="white">
        <Toolbar style={ToolbarStyle}>
          <PlayButton color={"#692d55"} />
        </Toolbar>
      </AppBar>
    );
  }
}

const ConnectedBottomNav = connect()(BottomNav);

export default ConnectedBottomNav;
