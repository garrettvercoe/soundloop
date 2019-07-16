import React, { Component } from "react";
import { render } from "react-dom";
import { Layer, Transformer, Circle } from "react-konva";
import { connect } from "react-redux";
import {addLoop, updateLoop} from "../actions/loops"

function LoopScale ({ shapeProps, isSelected, onSelect, onChange }){

  // shape state reference
  const shapeRef = React.useRef();
  // transformer state reference
  const trRef = React.useRef();

  React.useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.setNode(shapeRef.current);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);
  // return circle and transformer when selected
  return (
    <React.Fragment>
      
      <Circle
        onClick={onSelect}
        
        ref={shapeRef}
        {...shapeProps}
        x={window.innerWidth/2}
        y={window.innerHeight/2}
        fill={"transparent"}
        stroke={"#ed1e79"}
        strokeWidth={1.5}
        // onTransformEnd: change properties based on scale and reset scale of shapeProps
        onTransformEnd={e => {
          // transformer is changing scale
          const node = shapeRef.current;
          const scaleX = node.scaleX();

          // reset the scale of the node back to 1
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            radius: node.radius() * scaleX,
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          enabledAnchors={["top-right", "bottom-left"]}
          centeredScaling={true}
          rotateEnabled={false}
          borderStrokeWidth={0}
          anchorFill={"#ed1e79"}
          anchorCornerRadius={80}
          anchorSize={20}
          anchorStrokeWidth={0}
          ignoreStroke={true}
          boundBoxFunc={function(oldBoundBox, newBoundBox) {
            if (
              Math.abs(newBoundBox.width) >
              Math.min(
                window.innerHeight * (4 / 5),
                window.innerWidth * (4 / 5)
              )
            ) {
              return oldBoundBox;
            } else if (
              Math.abs(newBoundBox.width) <
              Math.min(window.innerHeight / 5, window.innerWidth / 5)
            ) {
              return oldBoundBox;
            }
            return newBoundBox;
          }}
        />
      )}
    </React.Fragment>
  );
};

class LoopTest extends React.Component{
  componentDidMount(){
    console.log("Mounted")
    //this.props.dispatch(updateLoop())
    this.props.dispatch(addLoop(1));
  };

  render(){
    return(
      <Layer>
        <LoopScale shapeProps={this.props.circle}/>
      </Layer>
    )
  }
}

function Loop(){
  // need to change to singular
  const initialCircles = [
    {
      radius: Math.min(window.innerWidth*(1/3), window.innerHeight*(1/3)),
      id: "loop"
    }
  ];

  const circleTest = {
    width: window.innerWidth * (2 / 3),
    height: window.innerHeight * (2 / 3),
    id: "loop"
  }

  const [circles, setCircles] = React.useState(initialCircles);
  const [selectedId, selectShape] = React.useState(null);
  const [circle, setCircle] = React.useState(circleTest)
  return (
    <Layer>
      {circles.map((circle, i) => {
        return (
          <LoopScale
            key={i}
            shapeProps={circle}
            isSelected={circle.id === selectedId}
            onSelect={() => {
              selectShape(circle.id);
            }}
            onChange={newAttrs => {
              const circs = circles.slice();
              circs[i] = newAttrs;
              setCircles(circs);
            }}
          />
          );
      })}
    </Layer>
  );
};

function mapStateToProps(state){
  console.log(state)
  return{
    //pass through loopExport
    radius: state.loops.radius
  }
}

// temporary component to handle componentDidMount and test state
class LoopExport extends React.Component{
  componentDidMount(){
    console.log("Mounted")
    //this.props.dispatch(updateLoop())
    this.props.dispatch(addLoop(window.innerHeight * 2/3));
  };
  render(){
    return(
      <Loop radius={this.props.radius}/>
    )
  }
}

export default connect(mapStateToProps)(LoopExport);
//export default connect(mapStateToProps)(LoopTest)
