import React, { useState } from 'react';

function SearchResults ({result, setSongs}) {

    return (
        <li className='result'>
                <img className="albumCover" src={result.albumCover}/>
                <p>{result.songName}</p>
                <p>{result.artist}</p>
                <button className="add" onClick={(e) => setSongs((prev) => [result, ...prev])}>+</button>
        </li>
    )
}

export default SearchResults;