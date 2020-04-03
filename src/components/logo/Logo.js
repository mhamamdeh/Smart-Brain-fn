import React from 'react';
import Tilt from 'react-tilt'
import './Logo.css';
import Brain from './brain.png';

const Logo = () => {
    return(
        <div className="ma4 mt0">
            <Tilt className="Tilt br2 shadow-2" options={{ max : 100 }} style={{ height: 120, width: 120 }} >
                <div className="Tilt-inner pa3"> 
                    <img alt='brain' src={Brain}/>
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;