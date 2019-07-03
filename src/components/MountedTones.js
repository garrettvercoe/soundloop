import React from "react";
import "../styles/index.css";
import { Circle, Layer } from "react-konva";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import Portal from "./Portal";
import { connect } from "react-redux";
import ToneKonva from "./ToneKonva";

class MountedTones extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     tones: ["red"]
  //   };
  //   this.generateTone = this.generateTone.bind(this);
  // }

  // generateTone() {
  //   this.setState(previousState => ({
  //     tones: [...previousState.tones, "blue"]
  //   }));
  // }

  render() {
    return (
      <Layer>
        {this.props.tones.map(function(item) {
          return (
            <ToneKonva
              color={item.color}
              x={item.position.x}
              y={item.position.y}
              offset={item.offset}
            />
          );
        })}
        {/* <Portal>
          <FontAwesomeIcon
            className="plus-icon inl-blk fa-lg"
            icon={faPlusCircle}
            onClick={this.generateTone}
            style={{
              position: "absolute",
              top: "80%",
              left: "80%"
            }}
          />
        </Portal> */}
      </Layer>
    );
  }
}

function mapStateToProps(state) {
  console.log(state); // state
  return {
    tones: state.tones
  };
}

export default connect(mapStateToProps)(MountedTones);
