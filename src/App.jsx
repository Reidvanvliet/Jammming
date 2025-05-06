import React, { useState, useEffect } from 'react'
import './App.css'
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Playlist from './Playlist';

const client_id = "2fac4d8b00b74fa7912463fa0d1f5b9f";
const client_secret = "da6d7503439f4bd58dcc074700cbf86a";


function App() {
  const [search, setSearch] = useState("");
  const [songs, setSongs] = useState([]);
  const [playlistSongs, setPlaylistSongs] = useState([]);
  const [title, setTitle] = useState("Playlist Title");

  let uniqueIdCounter = 0;

  const generateUniqueId = () => {
      const uniqueId = uniqueIdCounter;
      uniqueIdCounter++;
      return uniqueId;
  }

  const getAccessToken = async () => {
    try {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        body: new URLSearchParams({
          'grant_type': 'client_credentials',
          'client_id': client_id,
          'client_secret': client_secret
        })
      });
      if(response.ok) {
        const jsonResponse = await response.json();
        return jsonResponse
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getSearchData = async (authentication) => {
    try {
      const response = await fetch(`https://api.spotify.com/v1/search?q=${search}&type=track`, {
        headers: {
          'Authorization': `Bearer ${authentication.access_token}`
        }
      });
      if(response.ok) {
        const jsonResponse = await response.json();
        return jsonResponse
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    if (search) {
      getAccessToken().then((accessToken) => getSearchData(accessToken)).then((searchData) => handleData(searchData.tracks.items))
    }
  }
  ,[search]);


  function handleData (results) {
    let songs = [];
    results.map((result) => {
      songs.push({
          albumCover: result.album.images[2].url,
          songName: result.name,
          artist: result.artists[0].name,
          id: result.id
      })
    })
    setSongs(songs);
  }

  return (
    <>
      <header>
        <h1>Ja<span>mmm</span>ing</h1>
      </header>
      
      <div className="banner-container">
        <div className="main-banner"> 
          <h2>Add Your Favorite</h2>
          <h2>Spotify Songs!</h2>
          <div className="search-container">
            <SearchBar setSearch={setSearch} value={search}/>
          </div>
        </div>
      </div>

      <div className="songs-grid">

        <div className="search-results">
          <ul>
            {songs.map((song) => {
              return <SearchResults result={song} setPlaylistSongs={setPlaylistSongs} key={song.id} generateUniqueId={generateUniqueId} />
            })}
          </ul>
        </div>
        
        <div className="playlist">
          <ul>
            <li className="title">
              <input className="playlist-title" onChange={(e) => setTitle(e.target.value)} value ={title}></input>
            </li>
            {playlistSongs.map((playlistSong) => {
              playlistSong.playlistId = generateUniqueId();
              return <Playlist playlistSong={playlistSong} id={playlistSong.id} setPlaylistSongs={setPlaylistSongs} key={playlistSong.playlistId} />
            })}
            <li className="save">
              <button>Save to Spotify</button>
            </li>
          </ul>
        </div>
        <div className="footer"></div>
      </div>

      
    </>
  )
}

export default App
