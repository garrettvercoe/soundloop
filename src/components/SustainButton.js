import React from "react";
import "../styles/index.css";
import { connect } from "react-redux";
import { updateSustain } from "../actions/shared";
const LibListStyle = {
  textAlign: "left",
  margin: 0,
  zIndex: 1,
  padding: 0,
  position: "relative"
};

const LibListItemStyle = {
  display: "inline-block",
  verticalAlign: "top",
  padding: ".25rem"
};

class SustainButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
    console.log("clicked");
    this.props.dispatch(updateSustain(this.props.sustain));
  };

  render() {
    return (
      <button
        onClick={this.handleClick}
        style={{
          borderRadius: "100%",
          border: "none",
          backgroundColor:
            this.props.sustain === this.props.selectedSustain
              ? "#692d54"
              : "#c4b2be",
          width: this.props.toneSizes[this.props.sustain] * 2 + "px",
          height: this.props.toneSizes[this.props.sustain] * 2 + "px",
          position: "relative",
          marginTop: 50 - this.props.toneSizes[this.props.sustain] - 30 + "px",
          outline: "none"
        }}
      >
        <div className="sustain-select">
          {" "}
          {this.props.text}
          {/* {this.props.sustain === this.props.selectedSustain
            ? this.props.text
            : null}
        </div> */}
        </div>
      </button>
    );
  }
}

function mapStateToProps(state) {
  return {
    selectedSustain: state.shared.selectedSustain,
    toneSizes: state.shared.toneSizes
  };
}

const ConnectedSustainButton = connect(mapStateToProps)(SustainButton);

export default class SustainMenu extends React.Component {
  render() {
    var susToPass = ["32n", "16n", "8n", "4n", "2n", "1m", "2m"];
    var susToShow = ["", "16", "1/8", "1/4", "1/2", "1"];

    return (
      <React.Fragment>
        <h3 className="light inl-blk"> DURATION</h3>
        <ul style={LibListStyle}>
          {susToShow.map((item, i) => (
            <li style={LibListItemStyle} key={item.color}>
              <ConnectedSustainButton text={item} sustain={susToPass[i]} />
            </li>
          ))}
        </ul>
      </React.Fragment>
    );
  }
}
