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
import reducer from "../reducers";
import middleware from "../middleware";
import { Provider } from "react-redux";
import { createStore } from "redux";
import Cord from "../components/Cord";

const store = createStore(reducer, middleware);
class App extends Component {
  render() {
    // Stage is a div container
    // Layer is actual canvas element (so you may have several canvases in the stage)
    // And then we have canvas shapes inside the Layer
    return (
      <React.Fragment>
        <Stage width={window.innerWidth} height={window.innerHeight}>
          <Provider store={store}>
            <Cord />
            <Loop />
            <MountedTones />
          </Provider>
          <Portal>
            <Provider store={store}>
              <ToneLibrary />
              <BottomNav />
            </Provider>
          </Portal>
        </Stage>
      </React.Fragment>
    );
  }
}
export default App;
