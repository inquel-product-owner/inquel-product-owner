import React from 'react';
import Spinner from '../assets/Rolling.gif';
// import { Audio } from '@agney/react-loading';

function Loading() {
    return(

        <div className="fp-container">
            <img src={Spinner} className="fp-loader" alt="loading" />
            {/* <Audio width="50" /> */}
        </div>

    );
}

export default Loading;