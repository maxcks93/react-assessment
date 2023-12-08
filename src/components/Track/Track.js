import React, { useCallback } from 'react';
import './Track.css';

function Track(props){

    // invoke the addTrack function at the root component
    // the function will take the track as its argument 
    const addTrack = useCallback(
        (event) => {
            props.onAdd(props.track);
        },[props.onAdd]);

    // to render "+" button is the track is not saved in the playlist
    const renderAction = () => {
        if(!props.isSaved){
            return(
                <button onClick={addTrack}>
                    +
                </button>
            );
        };
    };

    return (
        <div className='Track'>
            <div>
                <h3>{props.track.name}</h3>
                <p>
                    {props.track.artist} | {props.track.album}
                </p>
            </div>
            {renderAction()}
        </div>
    );
}

export default Track;