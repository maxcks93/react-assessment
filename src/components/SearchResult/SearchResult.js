import React from 'react';
import './SearchResult.css';
import Tracklist from '../Tracklist/Tracklist';

function SearchResult(props){

    return (
        <div className='SearchResults'>
            <h2>Search Results</h2>
            <Tracklist 
            tracks={props.searchResults}
            onAdd={props.onAdd}/>
        </div>
    );
}

export default SearchResult;