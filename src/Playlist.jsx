import React, { useState } from 'react';

function Playlist ({playlistSong, setPlaylistSongs}) {

    return (
        <li className='tracks'>
            <img className="albumCover" src={playlistSong.src}/>
            <div className="song-info">
                <p className='track'>{playlistSong.name}</p>
                <p className='artist'>{playlistSong.artist}</p>
            </div>
            <button className="delete" onClick={(e) => setPlaylistSongs((prev) => prev.filter((e) => e.playlistId !== playlistSong.playlistId))}><i className="minus">-</i></button>
        </li>
    )
}

export default Playlist;