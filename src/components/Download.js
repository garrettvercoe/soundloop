import React from "react";
import "../styles/index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faArrowCircleDown
} from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import LoopKonva from "./LoopKonva";
import { addLoop } from "../actions/loops";

const contentContainer = { padding: "1rem 0  0 2rem" };

class Download extends React.Component {
  downloadFile = () => {
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(this.props.data)], {
      type: "json"
    });
    element.href = URL.createObjectURL(file);
    element.download = this.props.name + ".json";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  render() {
    return (
      <React.Fragment>
        <div className="tone-add" onClick={() => this.downloadFile()}>
          <FontAwesomeIcon
            className="plus-icon inl-blk fa-lg"
            icon={faArrowCircleDown}
          />
          <h3 className="light inl-blk">SAVE</h3>
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state
  };
}

export default connect(mapStateToProps)(Download);
