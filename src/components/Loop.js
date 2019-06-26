import React from "react";
import { render } from "react-dom";
import { Stage, Layer, Transformer, Circle } from "react-konva";

const LoopStyles = {};

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
        x={window.innerWidth / 2}
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

// need to change to singular
const initialCircles = [
  {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    offsetX: 0,
    offsetY: 0,
    width: window.innerWidth * (2 / 3),
    height: window.innerHeight * (2 / 3),
    fill: "transparent",
    id: "loop",
    stroke: "#ed1e79",
    strokeWidth: 1.5
  }
];

const Loop = () => {
  const [circles, setCircles] = React.useState(initialCircles);
  const [selectedId, selectShape] = React.useState(null);

  return (
    <Layer
      // deselect when clicked on empty area, currently doesn't work within layer of circle size
      onMouseDown={e => {
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
          selectShape(null);
        }
      }}
    >
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

export default class LoopExport extends React.Component {
  render() {
    return <Loop />;
  }
}
