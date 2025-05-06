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
  const [title, setTitle] = useState("Playlist Title");

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
      const response = await fetch('https://api.spotify.com/v1/tracks/51YZAJhOwIC5Gg3jMbAmhZ', {
        headers: {
          'Authorization': `Bearer ${authentication.access_token}`
        }
      });
      if(response.ok) {
        const jsonResponse = await response.json();
        console.log(jsonResponse);
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  getAccessToken().then((value) => getSearchData(value)).then();


  const jsonResponses = [
    {
      albumCover: "./images/sampleAlbumCover.jpg",
      songName: "I love men",
      artist: "Abba",
      id: 1
    },
    {
      albumCover: "./images/sampleAlbumCover.jpg",
      songName: "Super Heavy Death Metal",
      artist: "Asshole Rippers",
      id: 2
    },
    {
      albumCover: "./images/sampleAlbumCover.jpg",
      songName: "Techno Beats",
      artist: "Me in My Basement",
      id: 3
    }
  ]

  function handleData (results) {
    let songs = [];
    results.map((result) => {
      songs.push({
          albumCover: result.albumCover,
          songName: result.songName,
          artist: result.artist,
          id: result.id
      })
    })
    return songs;
  }

  const tests = handleData(jsonResponses);

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
            {tests.map((test) => {
              return <SearchResults result={test} setSongs={setSongs} key={test.id}/>
            })}
          </ul>
        </div>
        
        <div className="playlist">
          <ul>
            <li className="title">
              <input className="playlist-title" onChange={(e) => setTitle(e.target.value)} value ={title}></input>
            </li>
            {songs.map((song, index) => {
              song.playlistId = index
              return <Playlist song={song} id={song.id} setSongs={setSongs} key={index} />
            })}
            <li className="save">
              <button>Save to Spotify</button>
            </li>
          </ul>
        </div>
        
      </div>
      
      

    </>
  )
}

export default App
