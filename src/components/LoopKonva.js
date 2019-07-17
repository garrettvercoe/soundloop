import React from "react";
import { Circle } from "react-konva";
import { connect } from "react-redux";

class LoopKonva extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDragging: false,
      // x: window.innerWidth / 2,
      // y: window.innerHeight / 2,
      active: false
    };
  }

  render() {
    return (
      <Circle
        x={window.innerWidth / 2}
        y={window.innerHeight / 2}
        radius={this.props.radius}
        fill={"transparent"}
        stroke={"#ed1e79"}
        //strokeWidth={this.props.radius / 100}
        strokeWidth={1.5}
      />
    );
  }
}

export default connect()(LoopKonva);
