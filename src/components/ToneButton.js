import React from "react";
import "../styles/index.css";

import { connect } from "react-redux";
import { updateTone } from "../actions/tones";
import { playTone } from "../actions/cord";
import { cursorAdd } from "../actions/cursor";
class ToneButton extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    // this.handleDrag = this.handleDrag.bind(this);
  }

  handleStop() {}

  handleClick() {
    this.props.dispatch(cursorAdd(this.props.note, this.props.color));

    var radius = this.props.screenHeight / 350;
    for (var i = 0; i < this.props.tones.length; i++) {
      if (
        this.props.tones[i].sound === null &&
        !this.props.playing &&
        this.props.loops[this.props.tones[i].attachedLoop].active === true
      ) {
        this.props.dispatch(updateTone(i, "#692D55", null, radius));
      }
    }

    if (!this.props.playing) {
      this.props.dispatch(
        playTone(this.props.sound, this.props.selectedSustain)
      );
    }
  }

  render() {
    return (
      <React.Fragment>
        {/* <Draggable
          position={this.state.deltaPosition}
          onStop={this.handleStop}
          onStart={this.handleDrag}
        > */}
        <div className="outer-button">
          <div
            ref={this.selector}
            className="hover-shadow"
            onClick={this.handleClick}
            style={{
              borderRadius: "100%",
              backgroundColor: this.props.color,
              width: "2rem",
              zIndex: 1,
              height: "2rem",
              boxShadow:
                this.props.selectedNote === this.props.note &&
                this.props.mode === "ADD"
                  ? " 0 10px 10px rgba(0, 0, 0, 0.08), 0 3px 3px rgba(0, 0, 0, 0.2)"
                  : "none",
              border: "none",
              outline: "none"
            }}
          >
            <div
              className="note-select"
              style={{ color: this.props.textColor }}
            >
              {this.props.note}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    loops: state.loops,
    selectedNote: state.cursor.sound,
    tones: state.tones,
    playing: state.shared.playing,
    mode: state.cursor.mode,
    center: state.shared.center,
    screenHeight: state.shared.screenHeight,
    selectedSustain: state.shared.selectedSustain,
    toneSizes: state.shared.toneSizes
  };
}

//

export default connect(mapStateToProps)(ToneButton);
