import React, { useCallback } from 'react';
import './Playlist.css';
import Tracklist from '../Tracklist/Tracklist';

function Playlist(props){

    // invoke the renamePlaylist function of the root component.
    // the function will take in the value as the user input
    const handleNameChange = useCallback((event)=>{
        props.onRename(event.target.value);
    },[props.onRename]);

    return (
        <div className='Playlist'>
            <input 
            onChange={handleNameChange}
            value={props.playlistName}
            />
            <Tracklist 
            tracks={props.playlistTracks}
            isSaved={true}
            onRemove={props.onRemove}/>
            <button className="Playlist-save" onClick={props.onSave}>
                SAVE TO SPOTIFY
            </button>
        </div>
    );
}

export default Playlist;