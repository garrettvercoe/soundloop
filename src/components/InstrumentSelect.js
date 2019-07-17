import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FilledInput from "@material-ui/core/FilledInput";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { connect } from "react-redux";

class InstrumentSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "Piano"
    };
  }

  //   handleChange(event) {
  //     this.setValues(oldValues => ({
  //       ...oldValues,
  //       [event.target.name]: event.target.value
  //     }));
  //   }
  handleChange = event => {
    this.setState({ selected: event.target.value, name: event.target.name });
  };
  render() {
    return (
      <div style={{ paddingLeft: "5rem" }}>
        {" "}
        <FormControl>
          <InputLabel htmlFor="age-simple">Instrument</InputLabel>
          <Select
            value={this.state.selected}
            onChange={this.handleChange}
            inputProps={{
              name: "age",
              id: "age-simple"
            }}
          >
            <MenuItem value={"Clarinet"}>Clarinet</MenuItem>
            <MenuItem value={"Guitar"}>Guitar</MenuItem>
            <MenuItem value={"Piano"}>Piano</MenuItem>
          </Select>
        </FormControl>
      </div>
    );
  }
}

export default connect()(InstrumentSelect);
