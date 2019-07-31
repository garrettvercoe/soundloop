import React from "react";
class Cat extends React.Component {
  render() {
    const mouse = this.props.mouse;
    return (
      <div
        style={{
          position: "absolute",
          left: mouse.x,
          top: mouse.y,
          width: 20,
          height: 20,
          borderRadius: "50%",
          background: "red"
        }}
      >
        {" "}
        {mouse.x} {mouse.y}{" "}
      </div>
    );
  }
}

class Mouse extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div style={{ height: "100%" }} onMouseMove={this.handleMouseMove}>
        {/*
            Instead of providing a static representation of what <Mouse> renders,
            use the `render` prop to dynamically determine what to render.
          */}
        {this.props.render(this.state)}
      </div>
    );
  }
}

export default class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <Mouse render={mouse => <Cat mouse={mouse} />} />
      </div>
    );
  }
}
