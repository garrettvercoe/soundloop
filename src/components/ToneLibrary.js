import React from "react";
import "../styles/index.css";
import NewToneMenu from "./NewToneMenu";
import Tone from "tone";
import Draggable from "react-draggable"; // The default

const LibListStyle = {
  textAlign: "left",
  margin: 0,
  zIndex: 1,
  padding: 0,
  position: "relative"
};

const UnderListStyle = {
  textAlign: "left",
  margin: 0,
  zIndex: 0,
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
  constructor(props) {
    super(props);
    this.state = {
      deltaPosition: {
        x: 0,
        y: 0
      }
    };
    this.handleStop = this.handleStop.bind(this);
  }

  handleStop() {
    this.setState({
      deltaPosition: {
        x: 0,
        y: 0
      }
    });
  }

  render() {
    return (
      <Draggable position={this.state.deltaPosition} onStop={this.handleStop}>
        <button
          className="hover-shadow"
          style={{
            borderRadius: "100%",
            backgroundColor: this.props.color,
            width: "2rem",
            zIndex: 1,
            height: "2rem",
            border: "none",
            outline: "none"
          }}
        />
      </Draggable>
    );
  }
}

class ToneUnderlay extends React.Component {
  render() {
    return (
      <button
        className="hover-shadow"
        style={{
          borderRadius: "100%",
          border: "2px solid",
          borderColor: this.props.color,
          backgroundColor: "transparent",
          width: "2rem",
          height: "2rem",
          position: "relative",
          top: "-83px",
          outline: "none",
          pointerEvents: "none"
        }}
      />
    );
  }
}

class Library extends React.Component {
  render() {
    return (
      <React.Fragment>
        <ul style={LibListStyle}>
          {this.props.colors.map(color => (
            <li style={LibListItemStyle} key={color}>
              <ToneButton color={color} />
            </li>
          ))}
        </ul>

        <ul style={UnderListStyle}>
          {this.props.colors.map(color => (
            <li style={LibListItemStyle} key={color}>
              <ToneUnderlay color={color} />
            </li>
          ))}
        </ul>
      </React.Fragment>
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
