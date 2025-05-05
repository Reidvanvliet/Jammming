import React, { useState } from 'react';

function Playlist ({song, setSongs}) {

    return (
        <li>
            <img className="albumCover" src={song.albumCover}/>
            <p>{song.songName}</p>
            <p>{song.artist}</p>
            <button className="delete" onClick={(e) => setSongs((prev) => prev.filter((e) => e.playlistId !== song.playlistId))}>-</button>
        </li>
    )
}

export default Playlist;