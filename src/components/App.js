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
import MouseTracker from "./MouseTracker";

function initializeReactGA() {
  ReactGA.initialize("UA-145158244-1");
  ReactGA.pageview("/app");
}

initializeReactGA();

const store = createStore(reducer, middleware);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0
    };
    this._onMouseMove = this._onMouseMove.bind(this);
  }
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

  _onMouseMove(e) {
    console.log("Mouse move")
    console.log("X client: " + e.clientX)
    console.log("Y client: " + e.clientY)
    console.log("X: " + e.screenX)
    console.log("Y: " + e.screenY)
    this.setState({ x: e.clientX, y: e.clientY });
  }
  render() {
    // Stage is a div container
    // Layer is actual canvas element (so you may have several canvases in the stage)
    // And then we have canvas shapes inside the Layer
    return (
      <div onMouseMove={this._onMouseMove}>
        <Stage width={this.screenWidth} height={this.screenHeight}>
          <Provider store={store}>
            <MountedLoops />

            <MountedTones />
            <Cord />
          </Provider>
          <Portal>
            <div onMouseMove={this._onMouseMove}>
              <Provider store={store}>
                <MouseTracker
                  cursorPos={{ x: this.state.x, y: this.state.y }}
                />
                <BugReporter />
                <LeftNav />
                <BottomNav />
              </Provider>
            </div>
          </Portal>
        </Stage>
      </div>
    );
  }
}
export default App;
