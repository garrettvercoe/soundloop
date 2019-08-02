import React from "react";
import "../styles/index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBug } from "@fortawesome/free-solid-svg-icons";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import { Form, Input } from "semantic-ui-react";
const styles = theme => ({
  root: {
    margin: 0,
    padding: "4rem 4rem 3rem 4rem"
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <h2 style={{ margin: 0 }}>{children}</h2>
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
    padding: "0rem 4rem"
  }
}))(MuiDialogContent);

const buttonCircle = {
  backgroundColor: "#fff",
  border: "none",
  // height: "50px",
  // width: "50px",
  padding: "5px 20px",
  display: "block",
  position: "absolute",
  top: "5%",
  left: "87.5%",
  cursor: "pointer",
  borderRadius: "50px",
  boxShadow: "0 20px 10px rgba(0,0,0,0.01), 0 6px 6px rgba(0,0,0,0.05)"
};
const feedbackText = {
  fontSize: "12px",
  fontWeight: 500,
  fontFamily: "RelevantBold",
  letterSpacing: "1px"
};
class BugButton extends React.Component {
  render() {
    return (
      <React.Fragment>
        <button style={buttonCircle} className="bug">
          {" "}
          <FontAwesomeIcon
            className="bug-icon inl-blk  bug-hover fa-lg"
            icon={faBug}
          />{" "}
          <p style={feedbackText} className="inl-blk bug-hover purple">
            FEEDBACK
          </p>
        </button>
      </React.Fragment>
    );
  }
}
export default class NewToneMenu extends React.Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <React.Fragment>
        <div onClick={this.handleClickOpen}>
          <BugButton />
        </div>
        <Dialog
          PaperProps={{ elevation: 0 }}
          fullWidth={false}
          maxWidth={"md"}
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.state.open}
        >
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            <div className="purple"> Feedback and Bug Reports</div>
          </DialogTitle>
          <DialogContent>
            <Form
              id="contactform"
              action="https://formspree.io/grv9ff@virginia.edu"
              method="POST"
              target="_blank"
            >
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label="Ticket Title"
                  name="title"
                  placeholder="i.e. Looping Issue"
                  className="form-item"
                />

                <Form.Input
                  fluid
                  label="Email"
                  name="_replyto"
                  placeholder="johndoe@gmail.com"
                  className="form-item"
                />
                <Form.TextArea
                  fluid
                  label="Steps to Reproduce"
                  name="steps"
                  placeholder="1. Imported a SoundLoop..."
                  style={{ height: "50px" }}
                />
              </Form.Group>
              <Input type="hidden" name="_subject" value="Contact form" />

              <Form.TextArea
                className="form-message"
                label="Details & Additional Comments"
                name="message"
                placeholder="Please let us know your thoughts / issues. If bug: detail your device, OS, and browser so that we are able to test it. Thank you!"
              />
              <br />
              <Form.Button className="submit-ticket" onClick={this.handleClose}>
                SUBMIT TICKET
              </Form.Button>
            </Form>
          </DialogContent>
        </Dialog>
      </React.Fragment>
    );
  }
}
