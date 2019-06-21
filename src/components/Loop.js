import React from "react"
import Konva from "konva"
import { Circle } from "react-konva";

export default class Loop extends React.Component{
    constructor(props){
        super(props)
        // need to pass x and y position to get distance and corresponding size
        this.state = {
            isDragging: false,
            x: 100,
            y: 100
        }
    }

    render(){
        var distance = this.state.x - (window.innerWidth/2);
        console.log(this.state)
        console.log(distance)
        return(
            <Circle
                fill={'red'}
                radius={10}
                x={this.state.x}
                y={this.state.y}
                draggable
                fill={this.state.isDragging ? 'green' : 'black'}
                onDragStart={() => {
                this.setState({
                    isDragging: true
                });
                }}
                onDragEnd={e => {
                this.setState({
                    isDragging: false,
                    x: e.target.x(),
                    y: e.target.y()
                });
                }}
            />
        )
    }
}

class AnchorPoint extends React.Component{
    render(){
        var rect = new Konva.Rect({})
        var minim = Math.min(window.innerWidth/3, window.innerHeight/3);
        return ( // Loop position center, radius 
            <Circle
                x={window.innerWidth/2}
                y={window.innerHeight/2}
                radius={minim}
                fill={'transparent'} 
                stroke={'black'}
                scale={2}
                strokeWidth={3}
            />
        )
    }
}