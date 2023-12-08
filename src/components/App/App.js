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
      name: 'A Thousand Year',
      artist: 'Christina Perri',
      album: 'The Twilight Saga'
    },
    {
      id: 2,
      name: 'Baby',
      artist: 'Justin Bieber',
      album: 'Baby'
    },
    {
      id: 3,
      name: 'My Heart Will Go On',
      artist: 'Christina Perri',
      album: 'Titanic'
    }
  ];

  const playlistName = 'Max Cks';

  const playlistTracks = [
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
  ];

  // State hook to store search result array
  const [searchResults, setSearchResults] = useState([]);

  // search track function
  const searchTrack = useCallback((searchName)=>{
    const foundSong = songs.find(song => song.name === searchName);

    setSearchResults((originalData) => {
      return [...originalData, foundSong];
    });
  },[]);

 // for testing purpose
 console.log(searchResults);

  return (
    <div className="App">
      <h1>Jammming</h1>
      <SearchBar onSearch={searchTrack}/>
      <SearchResult searchResults={searchResults}/>
      <Playlist 
      playlistName = {playlistName}
      playlistTracks = {playlistTracks}/>
    </div>
  );
}

export default App;
