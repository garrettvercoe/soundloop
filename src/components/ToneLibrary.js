import React from "react";
import "../styles/index.css";
import NewToneMenu from "./NewToneMenu";
import Tone from "tone";
import Draggable from "react-draggable"; // The default

const LibListStyle = {
  textAlign: "left",
  margin: 0,
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

const contentContainer = { padding: "2rem" };

class ToneButton extends React.Component {
  render() {
    return (
      <button
        className="hover-shadow"
        style={{
          borderRadius: "100%",
          cursor: "grab",
          backgroundColor: this.props.color,
          width: "2rem",
          height: "2rem",
          border: "none",
          outline: "none"
        }}
        //onClick={this.CreateTone.bind(this)}
      />
    );
  }
}

class Library extends React.Component {
  render() {
    return (
      <ul style={LibListStyle}>
        {this.props.colors.map(color => (
          <li style={LibListItemStyle} key={color}>
            <ToneButton color={color} />
          </li>
        ))}
      </ul>
    );
  }
}

export default class LibraryContainer extends React.Component {
  render() {
    return (
      <div style={CardStyle}>
        <div style={contentContainer}>
          <h3 className="light inl-blk"> TONES</h3>
          <NewToneMenu />

          <Library
            colors={[
              "#fe6b12",
              "#fec52b",
              "#029e4e",
              "#e11a79",
              "#6581c9",
              "#7f47dd"
            ]}
          />
        </div>
      </div>
    );
  }
}
