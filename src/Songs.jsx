import React, { useState } from 'react';

function Songs ({result, setPlaylistSongs, generateUniqueId}) {

    return (
        <li className='tracks'>
            <img className="albumCover" src={result.src}/>
                <div className="song-info">
                    <p className='track'>{result.name}</p>
                    <p className='artist'>{result.artist}</p>
                </div>
            <button className="add" onClick={(e) => setPlaylistSongs((prev) => [{...result, playlistId: generateUniqueId()}, ...prev])}>+</button>
        </li>
    )
}

export default Songs;