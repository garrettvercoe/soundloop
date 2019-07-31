import Dropzone from "react-dropzone";
import React from "react";
import "../styles/index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faCloudUploadAlt
} from "@fortawesome/free-solid-svg-icons";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import { connect } from "react-redux";
import { importFile } from "../actions/shared";

const styles = theme => ({
  root: {
    margin: 0,
    padding: "2rem"
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[100]
  }
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <h2>{children}</h2>
      {onClose ? (
        <IconButton
          aria-label="Close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: "2rem"
  }
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: "4rem"
  }
}))(MuiDialogActions);

class UploadPopUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.onDrop = this.onDrop.bind(this);
  }

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  onDrop(acceptedFiles) {
    const reader = new FileReader();

    reader.onabort = () => console.log("file reading was aborted");
    reader.onerror = () => console.log("file reading has failed");
    reader.onload = () => {
      // Do whatever you want with the file contents
      const binaryStr = reader.result;
      var importedLoop = JSON.parse(binaryStr);
      this.props.dispatch(importFile(importedLoop));
    };

    acceptedFiles.forEach(file => reader.readAsBinaryString(file));
    this.handleClose();
  }

  render() {
    return (
      <React.Fragment>
        <div onClick={this.handleClickOpen}>
          <Dropzone onDrop={acceptedFiles => this.onDrop(acceptedFiles)}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()} className="no-dec">
                <input {...getInputProps()} />
                <FontAwesomeIcon
                  className="plus-icon inl-blk fa-lg"
                  icon={faPlusCircle}
                />

                <h3 className="light inl-blk">IMPORT</h3>
                {/* <div className="upload center">
                      <FontAwesomeIcon
                        className="import-icon inl-blk fa-4x center"
                        icon={faCloudUploadAlt}
                      />
                      <h2 className="upload-header">Drop files here</h2>
                      <p className="upload-body">or click to select files</p> */}
                {/* </div> */}
              </div>
            )}
          </Dropzone>
        </div>
        {/* <Dialog
          fullWidth={true}
          maxWidth={"md"}
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.state.open}
        >
          <DialogContent>
            
          </DialogContent>
        </Dialog> */}
      </React.Fragment>
    );
  }
}

export default connect()(UploadPopUp);
