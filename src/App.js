import React, { Component } from "react";
import { render } from "react-dom";
import { Stage, Layer, Rect, Text, Circle } from "react-konva";
import Konva from "konva";
import Tone from "tone";
import LibraryContainer from "./components/ToneLibrary";

export default class App extends Component {
  render() {
    // Stage is a div container
    // Layer is actual canvas element (so you may have several canvases in the stage)
    // And then we have canvas shapes inside the Layer
    return (
      <React.Fragment>
        <LibraryContainer />
        <Stage width={window.innerWidth} height={window.innerHeight}>
          <Layer>
            <Text text="Konva Stage" />
          </Layer>
        </Stage>
      </React.Fragment>
    );
  }
}
