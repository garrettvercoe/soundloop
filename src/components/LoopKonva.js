import React from "react";
import { Circle } from "react-konva";
import { connect } from "react-redux";
import { addTone } from "../actions/tones";

class LoopKonva extends React.Component {
  findAngleCoord(cx, cy, angle, distance) {
    const x2 = cx - Math.cos(angle) * distance;
    const y2 = cy + Math.sin(angle) * distance;
    return { x: x2, y: y2 };
  }

  componentDidMount() {
    var numTones = Math.pow(2, 4 - this.props.id);
    var interval = (2 * Math.PI) / numTones;
    var currAngle = 0;
    for (var i = 0; i < numTones; i++) {
      var coords = this.findAngleCoord(
        this.props.center.x,
        this.props.center.y,
        currAngle,
        this.props.radius
      );

      this.props.dispatch(
        addTone(
          "transparent",
          "#fff",
          1.5,
          coords.x - this.props.center.x,
          coords.y - this.props.center.y,
          this.props.id,
          20,
          null,
          0
        )
      );
      //this.props.dispatch(addTone(cx, cy, "#fff9f3", "#ed1e79", 1.5, coords.x-cx, (coords.y-cy), this.props.id, 20, null));
      currAngle = currAngle + interval;
    }
  }

  render() {
    return (
      <Circle
        x={this.props.center.x}
        y={this.props.center.y}
        radius={this.props.radius}
        fill={"transparent"}
        stroke={this.props.stroke}
        strokeWidth={1.5}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    center: state.shared.center
  };
}

export default connect(mapStateToProps)(LoopKonva);
