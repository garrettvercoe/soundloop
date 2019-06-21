import React, { Component } from "react";
import { render } from "react-dom";
import { Stage, Layer, Rect, Text, Circle } from "react-konva";
import Konva from "konva";
import Tone from "tone";
import LibraryContainer from "./components/ToneLibrary";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
    console.log(this.state);
  }
  render() {
    // Stage is a div container
    // Layer is actual canvas element (so you may have several canvases in the stage)
    // And then we have canvas shapes inside the Layer
    return (
      <React.Fragment>
        <LibraryContainer />
        <Stage
          style={{ zIndex: -99 }}
          width={window.innerWidth}
          height={window.innerHeight}
        >
          <Layer>
            <Text text="Konva Stage" />
          </Layer>
        </Stage>
      </React.Fragment>
    );
  }
}
