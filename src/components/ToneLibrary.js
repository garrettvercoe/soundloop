import React from "react";
import "../styles/index.css";

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

const card = {
  position: "absolute",
  top: "30%",
  left: "20%",
  width: "15rem",
  height: "14rem",
  backgroundColor: "#fff",
  borderRadius: "1%"
};

const contentContainer = { padding: "2rem" };

class ToneButton extends React.Component {
  render() {
    return (
      <button
        style={{
          borderRadius: "100%",
          cursor: "pointer",
          backgroundColor: this.props.color,
          width: "2rem",
          height: "2rem",
          border: "none"
        }}
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
      <div style={card}>
        <div style={contentContainer}>
          <h3 className="light"> TONES</h3>
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
