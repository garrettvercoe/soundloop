import React, { Component } from "react";
import { connect } from "react-redux";
import NewLoop from "./NewLoop";
import "../styles/index.css";
import NewToneMenu from "./NewToneMenu";
import ToneButton from "./ToneButton";
import Download from "./Download";
import TextField from "@material-ui/core/TextField";
import Upload from "./Upload";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faGlobeAmericas
} from "@fortawesome/free-solid-svg-icons";
import { tsConstructorType } from "@babel/types";
import { withStyles, makeStyles } from "@material-ui/core/styles";
const LibListStyle = {
  textAlign: "left",
  margin: 0,
  zIndex: 1,
  padding: 0,
  position: "relative"
};

const MenuItemStyle = {
  display: "block",
  margin: "0 auto",
  color: "#AB8FA2",
  paddingBottom: "2rem "
};
const MenuItemStyleActive = {
  display: "block",
  margin: "0 auto",

  color: "#E6E6E6",
  paddingBottom: "2rem "
};

const LeftNavMenu = {
  marginTop: "20vh"
};
const LibListItemStyle = {
  display: "inline-block",
  verticalAlign: "top",
  padding: ".25rem"
};

const CardStyle = {
  position: "absolute",
  top: "0%",
  left: "4%",
  width: "15rem",
  height: "100vh",
  backgroundColor: "#fff",
  borderRadius: "1%",
  boxShadow: "0 20px 10px rgba(0,0,0,0.01), 0 6px 6px rgba(0,0,0,0.05)"
};

const LeftNavStyle = {
  position: "absolute",
  top: "0%",
  left: "0%",
  width: "4vw",
  height: "100vh",
  backgroundColor: "#692D55"
};

const Buttons = [
  { color: "#fe6b12", sound: "E4" },
  { color: "#fec52b", sound: "G4" },
  { color: "#029e4e", sound: "B4" },
  { color: "#e11a79", sound: "D4" },
  { color: "#6581c9", sound: "F4" },
  { color: "#7f47dd", sound: "C4" }
];

const contentContainer = { padding: "2rem", position: "relative" };

class Library extends React.Component {
  render() {
    return (
      <ul style={LibListStyle}>
        {this.props.colors.map(item => (
          <li style={LibListItemStyle} key={item.color}>
            <ToneButton color={item.color} sound={item.sound} />
          </li>
        ))}
      </ul>
    );
  }
}

class LibraryContainer extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h3 className="light inl-blk"> TONES</h3>
        {/* <NewToneMenu /> */}

        <Library colors={Buttons} />
      </React.Fragment>
    );
  }
}

class CreateMenu extends React.Component {
  render() {
    return (
      <React.Fragment>
        <LibraryContainer />
        <NewLoop />
      </React.Fragment>
    );
  }
}

const ProjectField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#692D54"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#692D54"
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#692D54"
      }
    }
  }
})(TextField);

class ShareMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "MyProject"
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ name: event.target.value });
    console.log(this.state.name);
  }
  render() {
    return (
      <React.Fragment>
        <ProjectField
          id="standard-name"
          label="Project Name"
          defaultValue={this.state.name}
          value={this.state.name}
          onChange={this.handleChange}
          margin="normal"
        />
        <Download name={this.state.name} />
        <Upload />
      </React.Fragment>
    );
  }
}

export default class LeftNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showing: "createMenu",
      test: true
    };
    this.handleShare = this.handleShare.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.showMenu = this.showMenu.bind(this);
  }

  handleShare() {
    this.setState({ showing: "shareMenu" });
  }
  handleCreate() {
    this.setState({ showing: "createMenu" });
  }
  showMenu() {
    switch (this.state.showing) {
      case "createMenu":
        return <CreateMenu />;
      case "shareMenu":
        return <ShareMenu />;

      default:
        return null;
    }
  }

  render() {
    return (
      <React.Fragment>
        <div style={LeftNavStyle}>
          <div style={LeftNavMenu}>
            <FontAwesomeIcon
              className="inl-blk fa-2x menu-item"
              style={
                this.state.showing === "createMenu"
                  ? MenuItemStyleActive
                  : MenuItemStyle
              }
              icon={faPlusCircle}
              onClick={() => this.handleCreate()}
            />
            <FontAwesomeIcon
              className="inl-blk fa-2x  menu-item"
              style={
                this.state.showing === "shareMenu"
                  ? MenuItemStyleActive
                  : MenuItemStyle
              }
              icon={faGlobeAmericas}
              onClick={() => this.handleShare()}
            />
          </div>
        </div>
        <div style={CardStyle}>
          <div style={contentContainer}>
            <img
              alt="logo"
              src={require("../Logo.png")}
              style={{
                width: "7.5rem",
                margin: "0",
                display: "block",
                paddingBottom: "4rem"
              }}
            />

            <span className="logo-spacer" />

            <div>{this.showMenu()}</div>
            <div />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
