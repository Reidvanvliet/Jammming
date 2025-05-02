import React, { useState } from 'react';

function Playlist ({song, setSongs}) {

    return (
        <li>
            <img className="albumCover" src={song.albumCover}/>
            <p>{song.songName}</p>
            <p>{song.artist}</p>
            <button className="add" onClick={setSongs((prev) => prev.filter((e) => e.id !== song.id))}>-</button>
        </li>
    )
}