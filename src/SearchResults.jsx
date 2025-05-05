import React, { useState } from 'react';

function SearchResults ({result, setSongs}) {

    return (
        <li className='tracks'>
            <img className="albumCover" src={result.albumCover}/>
                <div className="song-info">
                    <p className='track'>{result.songName}</p>
                    <p className='artist'>{result.artist}</p>
                </div>
            <button className="add" onClick={(e) => setSongs((prev) => [result, ...prev])}>+</button>
        </li>
    )
}

export default SearchResults;