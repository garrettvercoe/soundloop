import React from "react";

import Checkbox from "@material-ui/core/Checkbox";
import { tsConstructorType } from "@babel/types";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";

export default class SoundEffects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Chorus: false,
      AutoPanner: false,
      AutoWah: false,
      PitchShift: false,
      StereoWidener: false,
      Tremolo: false,
      Effect: false,
      PingPongDelay: false,
      MidSideEffect: false,
      Convolver: false,
      StereoFeedbackEffect: false,
      Chebyshev: false,
      StereoEffect: false,
      Vibrato: false,
      BitCrusher: false,
      StereoXFeedbackEffect: false,
      FeedbackEffect: false,
      Reverb: false,
      Distortion: false,
      JCReverb: false,
      Freeverb: false,
      AutoFilter: false,
      FeedbackDelay: false,
      Phaser: false
    };

    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(item) {
    this.setState({ [item]: !this.state[item] });
  }
  render() {
    var options = [
      "Chorus",
      "AutoPanner",
      "AutoWah",
      "PitchShift",
      "StereoWidener",
      "Tremolo",
      "Effect",
      "PingPongDelay",
      "MidSideEffect",
      "Convolver",
      "StereoFeedbackEffect",
      "Chebyshev",
      "StereoEffect",
      "Vibrato",
      "BitCrusher",
      "StereoXFeedbackEffect",
      "FeedbackEffect",
      "Reverb",
      "Distortion",
      "JCReverb",
      "Freeverb",
      "AutoFilter",
      "FeedbackDelay",
      "Phaser"
    ];
    return (
      <React.Fragment>
        <div />
        {options.map(item => (
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state[item]}
                onChange={() => this.handleChange(item)}
                value={item}
              />
            }
            label={item}
          />
        ))}
      </React.Fragment>
    );
  }
}
