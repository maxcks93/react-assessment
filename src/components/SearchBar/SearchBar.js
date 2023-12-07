import React, { useState, useCallback } from "react";

import './SearchBar.css';


function SearchBar(props){

    const [searchName, setSearchName] = useState('');

    // Render the user input in the search bar when user is inputting
    const handleSearchNameChange = useCallback((event)=>{
        setSearchName(event.target.value);
    },[])

    // invoke the searchTrack function of the root component.
    // the function will take in the State Hook, searchName as its argument
    const search = useCallback(()=>{
        props.onSearch(searchName);
    },[props.onSearch, searchName])

    return (
        <div className='SearchBar'>
            <input 
            placeholder= "Enter A Song Title"
            onChange={handleSearchNameChange}/>
            <button onClick={search}>
                SEARCH
            </button>
        </div>
    );
}

export default SearchBar;