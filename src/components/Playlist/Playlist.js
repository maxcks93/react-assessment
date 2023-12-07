import React from 'react';
import './Playlist.css';
import Tracklist from '../Tracklist/Tracklist';

function Playlist(){

    return (
        <div className='Playlist'>
            <Tracklist />
            <button>
                SAVE TO SPOTIFY
            </button>
        </div>
    );
}

export default Playlist;