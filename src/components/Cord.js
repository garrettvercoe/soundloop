import React from "react";
import "../styles/index.css";
import AppBar from "@material-ui/core/AppBar";
import PlayButton from "./PlayButton";
import Toolbar from "@material-ui/core/Toolbar";
import { connect } from "react-redux";

class Cord extends React.Component{
    render(){
        return{
            
        }
    }

}

const ConnectedCord = connect()(Cord);

export default ConnectedCord;