import React from "react";
import { Circle } from "react-konva";
import { connect } from "react-redux";
import { addTone } from "../actions/tones";

class LoopKonva extends React.Component {
  findAngleCoord(cx, cy, angle, distance){
    const x2 = cx - Math.cos(angle) * distance;
    const y2 = cy + Math.sin(angle) * distance;
    return { x: x2, y: y2 };
  }

  componentDidMount(){
    var cx = window.innerWidth/2;
    var cy = window.innerHeight/2;

    var numTones = Math.pow(2, 4-this.props.id);
    var interval = (2*Math.PI)/numTones;
    var currAngle = 0;
    for (var i = 0; i < numTones; i++ ){
      var coords = this.findAngleCoord(cx, cy, currAngle, this.props.radius);
      console.log(coords)
      this.props.dispatch(addTone(cx, cy, "transparent", "#fff", 1.5, coords.x-cx, (coords.y-cy), this.props.id, 20, null, 0));
      //this.props.dispatch(addTone(cx, cy, "#fff9f3", "#ed1e79", 1.5, coords.x-cx, (coords.y-cy), this.props.id, 20, null));
      currAngle = currAngle+interval;
    }
    console.log("NUMTONES: " + numTones)
    var angle = 0;
  }

  
  render() {
    console.log("LOOP ID::: " + this.props.id)
    return (
      <Circle
        x={window.innerWidth / 2}
        y={window.innerHeight / 2}
        radius={this.props.radius}
        fill={"transparent"}
        stroke={this.props.stroke}
        strokeWidth={1.5}
      />
      
    );
  }
}

export default connect()(LoopKonva);
