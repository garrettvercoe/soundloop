import React, { Component } from "react";
import { render } from "react-dom";
import { Stage, Layer, Rect, Text, Circle } from "react-konva";
import Konva from "konva";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Portal from "./Portal";
import BottomNav from "./BottomNav";
import MountedTones from "./MountedTones";
import { connect } from "react-redux";
import reducer from "../reducers";
import middleware from "../middleware";
import { Provider } from "react-redux";
import { createStore } from "redux";
import MountedLoops from "./MountedLoops";
import Cord from "../components/Cord";
import LeftNav from "../components/LeftNav";
import { screenResize } from "../actions/shared";
import BugReporter from "./BugReporter";
import ReactGA from "react-ga";

function initializeReactGA() {
  ReactGA.initialize("UA-145158244-1");
  ReactGA.pageview("/app");
}

initializeReactGA();

const store = createStore(reducer, middleware);

class App extends Component {
  componentWillMount() {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  }
  componentDidMount() {
    window.addEventListener("resize", () => {
      store.dispatch(screenResize(window.innerWidth, window.innerHeight));
      this.screenWidth = store.getState().shared.screenWidth;
      this.screenHeight = store.getState().shared.screenHeight;
    });
  }
  render() {
    // Stage is a div container
    // Layer is actual canvas element (so you may have several canvases in the stage)
    // And then we have canvas shapes inside the Layer
    return (
      <React.Fragment>
        <Stage width={this.screenWidth} height={this.screenHeight}>
          <Provider store={store}>
            <MountedLoops />

            <MountedTones />
            <Cord />
          </Provider>
          <Portal>
            <Provider store={store}>
              <BugReporter />
              <LeftNav />
              <BottomNav />
            </Provider>
          </Portal>
        </Stage>
      </React.Fragment>
    );
  }
}
export default App;
