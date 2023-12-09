import React, { useState, useCallback } from "react";
import logo from './logo.svg';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResult from '../SearchResult/SearchResult';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

function App() {

  //Hardcode an array of song for testing
  // const songs = [
  //   {
  //     id: 1,
  //     name: 'Yellow',
  //     artist: 'Coldplay',
  //     album: 'Parachutes'
  //   },
  //   {
  //     id: 2,
  //     name: 'Bad Day',
  //     artist: 'Daniel Powter',
  //     album: 'Daniel Powter'
  //   },
  //   {
  //     id: 3,
  //     name: 'A Thousand Year',
  //     artist: 'Christina Perri',
  //     album: 'The Twilight Saga'
  //   },
  //   {
  //     id: 4,
  //     name: 'Baby',
  //     artist: 'Justin Bieber',
  //     album: 'Baby'
  //   },
  //   {
  //     id: 5,
  //     name: 'My Heart Will Go On',
  //     artist: 'Christina Perri',
  //     album: 'Titanic'
  //   }
  // ];

  // State hook to store search result array
  const [searchResults, setSearchResults] = useState([]);
  // State hook to store the tracks in the playlistTracks array
  const [playlistTracks, setPlaylistTracks] = useState([]);
  // State hook for playlistName to provide customization to user
  const [playlistName, setPlaylistName] = useState('New Playlist')

  // search track function
  // const searchTrack = useCallback((searchName)=>{
  //   const foundSong = songs.find(song => song.name === searchName);
  //   setSearchResults((originalData) => {
  //     return [...originalData, foundSong];
  //   });
  // },[]);

  // function to search track in Spotify via track's name
  const searchTrack = useCallback((term) => {
    Spotify.search(term).then(setSearchResults);
  }, []);

  // function to add track from search result to playlist
  const addTrack = useCallback((track)=>{
    // To add the track only if the playlist doesn't contain similar track
    if (!playlistTracks.some(savedTrack => savedTrack.id === track.id)){
      setPlaylistTracks((prevTracks)=>{
        return [...prevTracks, track];
      })
    };
  },[playlistTracks]);

  // function to remove the track from the playlist
  const removeTrack = useCallback((track)=>{
    setPlaylistTracks((prevTracks) =>
    prevTracks.filter((currentTrack) => currentTrack.id !== track.id)
  );
  },[]);

  // function to rename the playlist
  const renamePlaylist = useCallback((name)=>{
    setPlaylistName(name);
  },[])

  // function to save the playlist to the user's spotify account
  const savePlaylist = useCallback(() => {
    const trackUris = playlistTracks.map((track) => track.uri);
    Spotify.savePlaylist(playlistName, trackUris).then(() => {
      setPlaylistName('New Playlist');
      setPlaylistTracks([]);
    });
  }, [playlistName, playlistTracks]);

  return (
    <div>
      <h1>
        Ja<span className="highlight">mmm</span>ing
      </h1>
      <div className="App">
        <SearchBar onSearch={searchTrack}/>
        <div className="App-playlist">
          <SearchResult 
          searchResults={searchResults}
          onAdd={addTrack}/>
          <Playlist 
          playlistName = {playlistName}
          playlistTracks = {playlistTracks}
          onRemove={removeTrack}
          onRename={renamePlaylist}
          onSave={savePlaylist}/>
        </div>
      </div>
    </div>

  );
}

export default App;
