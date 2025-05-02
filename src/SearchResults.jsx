import React, { useState } from 'react';

function SearchResults ({searchResult, setSongs}) {
    const song = {
        albumCover: searchResult.albumCover,
        songName: searchResult.songName,
        artist: searchResult.Artist,
        id: searchResult.id
    }
   

    return (
        <li>
            <div className='result' id={song.id}>
                <img className="albumCover" src={song.albumCover}/>
                <p>{song.songName}</p>
                <p>{song.artist}</p>
                <button className="add" onClick={setSongs((prev) => [song, ...prev])}>+</button>
            </div>
        </li>
    )
}

export default SearchResults;