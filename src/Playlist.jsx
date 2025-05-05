import React, { useState } from 'react';

function Playlist ({song, setSongs}) {

    return (
        <li className='tracks'>
            <img className="albumCover" src={song.albumCover}/>
            <div className="song-info">
                <p className='track'>{song.songName}</p>
                <p className='artist'>{song.artist}</p>
            </div>
            <button className="delete" onClick={(e) => setSongs((prev) => prev.filter((e) => e.playlistId !== song.playlistId))}>-</button>
        </li>
    )
}

export default Playlist;