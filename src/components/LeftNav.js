import React, { Component } from "react";
import { connect } from "react-redux";
import NewLoop from "./NewLoop";
import "../styles/index.css";
import ToneButton from "./ToneButton";
import Download from "./Download";
import TextField from "@material-ui/core/TextField";
import Upload from "./Upload";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faTerminal,
  faGlobeAmericas
} from "@fortawesome/free-solid-svg-icons";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import { updateFilename, updateTempo, updateOctave } from "../actions/shared";
import { cursorErase, cursorMoveUnselected } from "../actions/cursor";
import SustainMenu from "./SustainButton";
import { ReactComponent as Move } from "../move.svg";
import { ReactComponent as Erase } from "../erase.svg";
import TrashButton from "./TrashButton";

import {
  red,
  pink,
  purple,
  indigo,
  blue,
  cyan,
  teal,
  green,
  yellow,
  amber,
  orange,
  deepOrange
} from "@material-ui/core/colors/";

const colorHues = [
  red,
  pink,
  purple,
  indigo,
  blue,
  cyan,
  teal,
  green,
  yellow,
  amber,
  orange,
  deepOrange
];
const textLookup = [0, 600, 600, 800, 800, 200, 100, 50];
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
  marginTop: "21.5vh"
};
const LibListItemStyle = {
  display: "inline-block",
  verticalAlign: "top",
  padding: ".25rem"
};

const CardStyle = {
  position: "absolute",
  top: "0%",
  zIndex: 10,
  left: "60px",
  width: "320px",
  height: "100vh",
  backgroundColor: "#fff",
  borderRadius: "1%",
  overflowY: "auto",
  maxWidth: "100%",
  overflowX: "hidden",
  boxShadow: "0 20px 10px rgba(0,0,0,0.01), 0 6px 6px rgba(0,0,0,0.05)"
};

const LeftNavStyle = {
  position: "absolute",
  top: "0%",
  left: "0%",
  width: "60px",
  height: "100vh",
  backgroundColor: "#692D55"
};

const contentContainer = {
  padding: "2rem",
  position: "relative"
};

const OctaveSlider = withStyles({
  root: {
    color: "#692D54",
    height: 2
  },
  thumb: {
    height: 28,
    width: 28,

    marginTop: -14,
    marginLeft: -14,
    "&:focus,&:hover,&$active": {
      boxShadow:
        "0 3px 1px rgba(0,0,0,0.01),0 2px 4px rgba(0,0,0,0.1),0 0 0 1px rgba(0,0,0,0.001)",
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {}
    }
  },
  active: {},
  track: {
    height: 3,
    borderRadius: 4
  },
  mark: {
    height: 7,
    width: 2,
    marginTop: -2
  },
  markActive: {
    backgroundColor: "currentColor"
  },
  rail: {
    height: 3,
    borderRadius: 4
  },

  valueLabel: {
    left: "calc(-50% + 11px)",
    top: 8,

    "& *": {
      background: "transparent",
      color: "#fff"
    }
  }
})(Slider);

class LibraryUnconnected extends React.Component {
  constructor(props) {
    super(props);
    this.buttons = [];
    this.buttonList = [];

    this.octaves = [3, 4, 5, 6];
    for (let j = 0; j < this.octaves.length; j++) {
      for (let i = 0; i < colorHues.length; i++) {
        this.buttons.push({
          color: colorHues[i][this.octaves[j] * 100],
          sound: this.props.sounds[i] + this.octaves[j],
          note: this.props.sounds[i],
          textColor: colorHues[i][textLookup[this.octaves[j]]]
        });
      }

      this.buttonList.push(this.buttons);
      this.buttons = [];
    }
    this.state = { tones: this.buttonList, noteSelected: false };
    this.handleOctave = this.handleOctave.bind(this);
    this.handleErase = this.handleErase.bind(this);
    this.handleMove = this.handleMove.bind(this);
  }

  handleOctave(event, newValue) {
    this.props.dispatch(updateOctave(newValue));
  }

  handleErase() {
    this.props.dispatch(cursorErase());
  }

  handleMove() {
    this.props.dispatch(cursorMoveUnselected());
  }

  render() {
    return (
      <React.Fragment>
        {/* <div className={this.state.noteSelected ? "cursor" : ""}> </div> */}
        <h3 className="light inl-blk"> NOTES</h3>
        <ul style={LibListStyle}>
          {this.state.tones[this.props.octave - 3].map(item => (
            <li style={LibListItemStyle} key={item.color}>
              <ToneButton
                color={item.color}
                sound={item.sound}
                note={item.note}
                textColor={item.textColor}
              />
            </li>
          ))}
          <div style={LibListItemStyle}>
            <Move
              style={{
                width: "32px",
                cursor: "pointer",
                borderRadius: "50%",
                boxShadow:
                  this.props.mode === "MOVE_UNSELECTED" ||
                  this.props.mode === "MOVE_SELECTED"
                    ? " 0 10px 10px rgba(0, 0, 0, 0.08), 0 3px 3px rgba(0, 0, 0, 0.2)"
                    : "none"
              }}
              onClick={() => this.handleMove()}
            />
          </div>
          <div style={LibListItemStyle}>
            <Erase
              style={{
                width: "32px",
                cursor: "pointer",
                borderRadius: "50%",
                boxShadow:
                  this.props.mode === "ERASE"
                    ? " 0 10px 10px rgba(0, 0, 0, 0.08), 0 3px 3px rgba(0, 0, 0, 0.2)"
                    : "none"
              }}
              onClick={() => this.handleErase()}
            />
          </div>
        </ul>
        <br />
        <h3 className="light inl-blk"> OCTAVE</h3>
        <OctaveSlider
          defaultValue={4}
          onChange={this.handleOctave}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="on"
          step={1}
          marks
          min={3}
          max={6}
        />
        <br /> <br />
        <SustainMenu />
      </React.Fragment>
    );
  }
}

const Library = connect(mapStateToProps)(LibraryUnconnected);

class LibraryContainer extends React.Component {
  render() {
    return (
      <React.Fragment>
        {/* <NewToneMenu /> */}

        <Library />
      </React.Fragment>
    );
  }
}

class CreateMenuUnconnected extends React.Component {
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
        <LibraryContainer />
        <div style={{ margin: "0 auto", position: "relative" }}>
          <NewLoop />
          <TrashButton />
        </div>
      </React.Fragment>
    );
  }
}

const CreateMenu = connect(mapStateToProps)(CreateMenuUnconnected);

class TerminalMenu extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h3> Welcome to the terminal.</h3>
        <p> This feature is still in development. Check back soon! </p>
        <TextField
          id="outlined-multiline-static"
          multiline
          label="Terminal"
          rows="20"
          defaultValue="Default Value"
          margin="normal"
          variant="filled"
        />
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

class ShareMenuUnconnected extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.dispatch(updateFilename(event.target.value));
  }
  render() {
    return (
      <React.Fragment>
        <ProjectField
          id="standard-name"
          label="Project Name"
          defaultValue={this.props.name}
          value={this.props.name}
          onChange={this.handleChange}
          margin="normal"
        />
        <Download name={this.props.name} />
        <Upload />
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    name: state.shared.fileName,
    tempo: state.shared.tempo,
    sounds: state.shared.sounds,
    octave: state.shared.octave,
    mode: state.cursor.mode,
    playing: state.shared.playing
  };
}

const ShareMenu = connect(mapStateToProps)(ShareMenuUnconnected);
export default class LeftNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showing: "createMenu"
    };
    this.handleShare = this.handleShare.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleTerminal = this.handleTerminal.bind(this);
    this.showMenu = this.showMenu.bind(this);
  }

  handleShare() {
    this.setState({ showing: "shareMenu" });
  }
  handleTerminal() {
    this.setState({ showing: "terminalMenu" });
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
      case "terminalMenu":
        return <TerminalMenu />;
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
            {/* <FontAwesomeIcon
              className="inl-blk fa-lg  menu-item"
              style={
                this.state.showing === "terminalMenu"
                  ? MenuItemStyleActive
                  : MenuItemStyle
              }
              icon={faTerminal}
              onClick={() => this.handleTerminal()}
            /> */}
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
                paddingBottom: "10vh"
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
