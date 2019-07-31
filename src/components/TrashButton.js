import React from "react";
import "../styles/index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedoAlt } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { trashAll } from "../actions/shared";

const TrashButtonInactive = {
  color: "#ddd",
  position: "relative",
  float: "right",
  padding: "0 2rem 0rem 2rem"
};
const TrashButtonActive = {
  color: "#692d55",
  position: "relative",
  float: "right",
  padding: "0 2rem 0rem 2rem"
};

class TrashButton extends React.Component {
  render() {
    return (
      <React.Fragment>
        {this.props.playing ? (
          <FontAwesomeIcon
            className="inl-blk fa-lg"
            style={TrashButtonInactive}
            icon={faRedoAlt}
          />
        ) : (
          <FontAwesomeIcon
            className="inl-blk fa-lg"
            style={TrashButtonActive}
            icon={faRedoAlt}
            onClick={() => this.props.dispatch(trashAll())}
          />
        )}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    playing: state.shared.playing
  };
}

export default connect(mapStateToProps)(TrashButton);
