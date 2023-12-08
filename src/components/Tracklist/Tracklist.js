import React from 'react';
import './Tracklist.css';
import Track from '../Track/Track';

function Tracklist(props){

    return (
        <div className='Tracklist'>
            {props.tracks && props.tracks.map((track)=>{
                return(
                    <Track 
                    key={track.id}
                    track={track}
                    onAdd={props.onAdd}
                    isSaved={props.isSaved}
                    onRemove={props.onRemove}/>
                );
            })}
        </div>
    );
}

export default Tracklist;