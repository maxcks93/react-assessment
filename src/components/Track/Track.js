import React, { useCallback } from 'react';
import './Track.css';

function Track(props){

    // invoke the addTrack function at the root component
    // the function will take the track as its argument 
    const addTrack = useCallback((event) => {
        props.onAdd(props.track);
    },[props.onAdd, props.track]);

    // invoke the removeTrack function at the root component
    // the function will take the track as its argument 
    const removeTrack = useCallback((event) =>{
        props.onRemove(props.track);
    },[props.onRemove, props.track]);

    // to render "+" button if the track is not saved in the playlist
    // to render "-" button if the track is saved in the playlist
    const renderAction = () => {
        if(!props.isSaved){
            return(
                <button className="Track-action" onClick={addTrack}>
                    +
                </button>
            );
        } else{
            return(
                <button className="Track-action" onClick={removeTrack}>
                    -
                </button>
            );
        };
    };

    return (
        <div className='Track'>
            <div className='Track-information'>
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