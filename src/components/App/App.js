import React, { useState, useCallback } from "react";
import logo from './logo.svg';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResult from '../SearchResult/SearchResult';
import Playlist from '../SearchResult/SearchResult';

function App() {

  //Hardcode an array of song for testing
  const songs = [
    {
      id: 1,
      name: 'A Thousand Year',
      altist: 'Christina Perri',
      album: 'The Twilight Saga'
    },
    {
      id: 2,
      name: 'Baby',
      altist: 'Justin Bieber',
      album: 'Baby'
    },
    {
      id: 3,
      name: 'My heart will go on',
      altist: 'Christina Perri',
      album: 'Titanic'
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
      <SearchResult />
      <Playlist />
    </div>
  );
}

export default App;
