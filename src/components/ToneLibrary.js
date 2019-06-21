import React from "react";

class ToneButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { color: "#000" };
  }
  render() {
    return <div>test</div>;
  }
}

export default class LibraryContainer extends React.Component {
  render() {
    return <div> This is the container</div>;
  }
}
