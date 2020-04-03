import React, { Component } from 'react';
import './FaceRecognition.css';

class FaceRecognition extends Component {

    constructor(props) {
        super();
    }

    setBord = () => {
        const img = document.getElementById("cont")
        const x = this.props.box.map(data => {
            console.log(data)
            var div = document.createElement("div");
            div.className = "bounding-box";
            div.style = `{top: ${data.topRow},
                          right: ${data.rightCol}, 
                          bottom: ${data.buttomRow}, 
                          left: ${data.leftCol}}`;
            img.appendChild(div);
            return x;
        })
    }

    render() {
        return(
            <div className='center ma'>
                <div id='cont' className='absolute mt2'>
                    <img id='inputImage' alt='' onChange={this.setBord} src={this.props.imageUrl} width='500px' heiglt='auto'/>
                    <div className='bounding-box' style={{top: this.props.box.topRow,
                                                        right: this.props.box.rightCol, 
                                                        bottom: this.props.box.buttomRow, 
                                                        left: this.props.box.leftCol}} />
                </div>
            </div>
        )
    } 
}

export default FaceRecognition;