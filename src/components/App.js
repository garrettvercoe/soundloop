import React, { Component } from "react";
import { render } from "react-dom";
import { Stage, Layer, Rect, Text, Circle } from "react-konva";
import Konva from "konva";
import ToneLibrary from "./ToneLibrary";
import Loop from "./Loop";
import Portal from "./Portal";
import BottomNav from "./BottomNav";
import MountedTones from "./MountedTones";
import { connect } from "react-redux";

class App extends Component {
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
        <Stage width={window.innerWidth} height={window.innerHeight}>
          <Loop />
          <MountedTones />
          <Portal>
            <ToneLibrary />
            <BottomNav />
          </Portal>
        </Stage>
      </React.Fragment>
    );
  }
}
export default connect()(App);
