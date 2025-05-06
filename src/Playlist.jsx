import React, { useState } from 'react';

function Playlist ({playlistSong, setPlaylistSongs}) {

    return (
        <li className='tracks'>
            <img className="albumCover" src={playlistSong.albumCover}/>
            <div className="song-info">
                <p className='track'>{playlistSong.songName}</p>
                <p className='artist'>{playlistSong.artist}</p>
            </div>
            <button className="delete" onClick={(e) => setPlaylistSongs((prev) => prev.filter((e) => e.playlistId !== playlistSong.playlistId))}>-</button>
        </li>
    )
}

export default Playlist;