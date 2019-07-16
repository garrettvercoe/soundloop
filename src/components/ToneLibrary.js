import React from "react";
import "../styles/index.css";
import NewToneMenu from "./NewToneMenu";
import Tone from "tone";
import Draggable from "react-draggable"; // The default
import { connect } from "react-redux";
import ToneButton from "./ToneButton";
const LibListStyle = {
  textAlign: "left",
  margin: 0,
  zIndex: 1,
  padding: 0,
  position: "relative"
};

const LibListItemStyle = {
  display: "inline-block",
  verticalAlign: "top",
  padding: ".25rem"
};

const CardStyle = {
  position: "absolute",
  top: "30%",
  left: "5%",
  width: "15rem",
  height: "14rem",
  backgroundColor: "#fff",
  borderRadius: "1%",
  boxShadow: "0 20px 10px rgba(0,0,0,0.01), 0 6px 6px rgba(0,0,0,0.05)"
};

const Buttons = [
  { color: "#fe6b12", sound: "C4" },
  { color: "#fec52b", sound: "D4" },
  { color: "#029e4e", sound: "E4" },
  { color: "#e11a79", sound: "F4" },
  { color: "#6581c9", sound: "G4" },
  { color: "#7f47dd", sound: "A4" }
];

const contentContainer = { padding: "2rem" };

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
      <div style={CardStyle}>
        <div style={contentContainer}>
          <h3 className="light inl-blk"> TONES</h3>
          <NewToneMenu />

          <Library colors={Buttons} />
        </div>
      </div>
    );
  }
}

export default LibraryContainer;
