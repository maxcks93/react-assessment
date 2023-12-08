import React, { useState, useCallback } from "react";
import logo from './logo.svg';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResult from '../SearchResult/SearchResult';
import Playlist from '../Playlist/Playlist';

function App() {

  //Hardcode an array of song for testing
  const songs = [
    {
      id: 1,
      name: 'Yellow',
      artist: 'Coldplay',
      album: 'Parachutes'
    },
    {
      id: 2,
      name: 'Bad Day',
      artist: 'Daniel Powter',
      album: 'Daniel Powter'
    },
    {
      id: 3,
      name: 'A Thousand Year',
      artist: 'Christina Perri',
      album: 'The Twilight Saga'
    },
    {
      id: 4,
      name: 'Baby',
      artist: 'Justin Bieber',
      album: 'Baby'
    },
    {
      id: 5,
      name: 'My Heart Will Go On',
      artist: 'Christina Perri',
      album: 'Titanic'
    }
  ];

  const playlistName = 'Max Cks';

  // State hook to store search result array
  const [searchResults, setSearchResults] = useState([]);
  // State hook to store the tracks in the playlistTracks array
  const [playlistTracks, setPlaylistTracks] = useState([
    {
      id: 1,
      name: 'Yellow',
      artist: 'Coldplay',
      album: 'Parachutes'
    },
    {
      id: 2,
      name: 'Bad Day',
      artist: 'Daniel Powter',
      album: 'Daniel Powter'
    }
  ]);

  // search track function
  const searchTrack = useCallback((searchName)=>{
    const foundSong = songs.find(song => song.name === searchName);

    setSearchResults((originalData) => {
      return [...originalData, foundSong];
    });
  },[]);

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

 // for testing purpose
 console.log(searchResults);

  return (
    <div className="App">
      <h1>Jammming</h1>
      <SearchBar onSearch={searchTrack}/>
      <SearchResult 
      searchResults={searchResults}
      onAdd={addTrack}/>
      <Playlist 
      playlistName = {playlistName}
      playlistTracks = {playlistTracks}
      onRemove={removeTrack}/>
    </div>
  );
}

export default App;
