import React from "react";
import { Circle } from "react-konva";
import { connect } from "react-redux";
import { addTone } from "../actions/tones";
import { throwStatement } from "@babel/types";

class LoopKonva extends React.Component {
  findAngleCoord(cx, cy, angle, distance) {
    const x2 = cx - Math.cos(angle) * distance;
    const y2 = cy + Math.sin(angle) * distance;
    return { x: x2, y: y2 };
  }

// componentDidUpdate(prevProps){
//   if (prevProps.mode !== this.props.mode){
//     if (prevProps.mode === "angular"){
//       console.log("ANG")
//       this.numTones = this.numTones = Math.pow(2, 5 - this.props.id);
//     }
//     else if (prevProps.mode === "linear"){
//       console.log("LIN")
//       this.numTones = 16;
//     }
    
//   }
// }

  componentDidMount() {
    this.numTones = 0;
    if (this.props.mode === "linear"){
      this.numTones = 16;
    } else if (this.props.mode === "angular"){
      this.numTones = Math.pow(2, 5 - this.props.id);
    }
    else if (this.props.mode === "init"){
      this.numTones = 16;
    }
  var interval = (2 * Math.PI) / this.numTones;
      var currAngle = 0;
      for (var i = 0; i < this.numTones; i++) {
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
            this.props.screenHeight/50,
            null,
            0
          )
        );
        currAngle = currAngle + interval;
}
  }

// componentDidUpdate(prevProps){
//   if (prevProps.mode !== this.props.mode){
//     console.log("HERE NOW")
//     if (this.props.mode === "angular"){
//       var numTones = 16;
//       var interval = (2 * Math.PI) / numTones;
//       var currAngle = 0;
//       for (var i = 0; i < numTones; i++) {
//         var coords = this.findAngleCoord(
//           this.props.center.x,
//           this.props.center.y,
//           currAngle,
//           this.props.radius
//         );
//         console.log("ANGULARRR");
//         this.props.dispatch(
//           addTone(
//             "transparent",
//             "#fff",
//             1.5,
//             coords.x - this.props.center.x,
//             coords.y - this.props.center.y,
//             this.props.id,
//             this.props.screenHeight/50,
//             null,
//             0
//           )
//         );
//         currAngle = currAngle + interval;
//     }
//   } else {
//     var numTones = Math.pow(2, 5 - this.props.id);
//     var interval = (2 * Math.PI) / numTones;
//     var currAngle = 0;
//     for (var i = 0; i < numTones; i++) {
//       var coords = this.findAngleCoord(
//         this.props.center.x,
//         this.props.center.y,
//         currAngle,
//         this.props.radius
//       );

//       this.props.dispatch(
//         addTone(
//           "transparent",
//           "#fff",
//           1.5,
//           coords.x - this.props.center.x,
//           coords.y - this.props.center.y,
//           this.props.id,
//           this.props.screenHeight/50,
//           null,
//           0
//         )
//       );
//       currAngle = currAngle + interval;
//     }
//   }
//   }
// }

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
    center: state.shared.center,
    shared: state.shared,
    mode: state.shared.mode,
    screenHeight: state.shared.screenHeight
  };
}

export default connect(mapStateToProps)(LoopKonva);
