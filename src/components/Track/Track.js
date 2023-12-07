import React from 'react';
import './Track.css';

function Track(props){

    return (
        <div className='Track'>
            <div>
                <h3>{props.track.name}</h3>
                <p>
                    {props.track.artist} | {props.track.album}
                </p>
            </div>
        </div>
    );
}

export default Track;