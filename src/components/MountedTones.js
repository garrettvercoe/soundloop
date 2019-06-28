import React from "react";
import "../styles/index.css";
import { Circle, Layer } from "react-konva";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import Portal from "./Portal";

class ToneKonva extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDragging: false,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      active: false
    };
  }

  render() {
    return (
      <Circle
        x={this.props.x}
        y={this.props.y}
        draggable
        fill={this.props.color}
        radius={16}
        onDragStart={() => {
          this.setState({
            isDragging: true
          });
        }}
        onDragEnd={e => {
          this.setState({
            isDragging: false,
            x: e.target.x(),
            y: e.target.y()
          });
        }}
      />
    );
  }
}

export default class MountedTones extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tones: ["red"]
    };
    this.generateTone = this.generateTone.bind(this);
  }

  generateTone() {
    this.setState(previousState => ({
      tones: [...previousState.tones, "blue"]
    }));
  }

  render() {
    return (
      <Layer>
        {this.state.tones.map(function(item) {
          return (
            <ToneKonva
              color={item}
              x={window.innerWidth / 2}
              y={window.innerHeight / 2}
            />
          );
        })}
        <Portal>
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
        </Portal>
      </Layer>
    );
  }
}
