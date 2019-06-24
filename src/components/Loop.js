import React from "react";
import { render } from "react-dom";
import { Stage, Layer, Transformer, Circle } from "react-konva";

const LoopScale = ({ shapeProps, isSelected, onSelect, onChange }) => {
  const shapeRef = React.useRef();
  const trRef = React.useRef();

  React.useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.setNode(shapeRef.current);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <React.Fragment>
      <Circle
        onClick={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onDragEnd={e => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y()
          });
        }}
        onTransformEnd={e => {
          // transformer is changing scale
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            width: node.width() * scaleX,
            height: node.height() * scaleY
          });
        }}
      />
      {isSelected && <Transformer ref={trRef} />}
    </React.Fragment>
  );
};

const initialCircles = [
  {
    x: 70,
    y: 70,
    width: 100,
    height: 100,
    fill: "transparent",
    id: "loop",
    stroke: "black",
    strokeWidth: 3
  }
];

export const LoopTest = () => {
  const [circles, setCircles] = React.useState(initialCircles);
  const [selectedId, selectShape] = React.useState(null);

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={e => {
        // deselect when clicked on empty area
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
          selectShape(null);
        }
      }}
    >
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
    </Stage>
  );
};

export default class Loop extends React.Component{
    render(){
        return(<LoopTest />)
    };
};