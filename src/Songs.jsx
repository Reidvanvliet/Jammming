import React, { useState } from 'react';


function Songs ({result, setPlaylistSongs, generateUniqueId, getAlbum, getArtist, changeRender}) {

    if(changeRender == 'track') {
        return (
            <li className='tracks'>
                <img className="album-cover" src={result.src}/>
                    <div className="song-info">
                        <p className='track'>{result.name}</p>
                        <p className='artist'>{result.artist}</p>
                    </div>
                <button className="add" onClick={(e) => setPlaylistSongs((prev) => [{...result, playlistId: generateUniqueId()}, ...prev])}><i className="plus">+</i></button>
            </li>
        )
    } else if (changeRender == 'artist') {
        return (
            <li className='tracks'>
            <img className="album-cover" src={result.src}/>
                <div className="song-info">
                    <p className='track'>{result.name}</p>
                    <p className='artist'>{result.artist}</p>
                </div>
            <button className="add" onClick={() => getArtist(result.id)}><i className="arrow"></i></button>
        </li>
        )
    } else if (changeRender == 'album') {
        return (
            <li className='tracks'>
            <img className="album-cover" src={result.src}/>
                <div className="song-info">
                    <p className='track'>{result.name}</p>
                    <p className='artist'>{result.artist}</p>
                </div>
            <button className="add" onClick={() => getAlbum(result.id)}><i className="arrow"></i></button>
        </li>
        )
    }
}

export default Songs;