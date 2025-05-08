import React, { useState } from 'react';

function Playlist ({playlistSong, setPlaylistSongs}) {

    return (
        <li className='tracks'>
            <img className="albumCover" src={playlistSong.album.images[2].url}/>
            <div className="song-info">
                <p className='track'>{playlistSong.name}</p>
                <p className='artist'>{playlistSong.artists[0].name}</p>
            </div>
            <button className="delete" onClick={(e) => setPlaylistSongs((prev) => prev.filter((e) => e.playlistId !== playlistSong.playlistId))}>-</button>
        </li>
    )
}

export default Playlist;