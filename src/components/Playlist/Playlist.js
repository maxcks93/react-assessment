import React from 'react';
import './Playlist.css';
import Tracklist from '../Tracklist/Tracklist';

function Playlist(props){

    return (
        <div className='Playlist'>
            <h2>{props.playlistName}</h2>
            <Tracklist 
            tracks={props.playlistTracks}
            isSaved={true}
            onRemove={props.onRemove}/>
            <button>
                SAVE TO SPOTIFY
            </button>
        </div>
    );
}

export default Playlist;