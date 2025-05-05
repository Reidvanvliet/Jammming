import React, { useState, useEffect } from 'react'
import './App.css'
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Playlist from './Playlist';


function App() {
  const [search, setSearch] = useState("");
  const [songs, setSongs] = useState([]);
  const [title, setTitle] = useState("Playlist Title");

  /*const searchSongs = async (search) => {
    try {
      const response = await fetch(URL);
      if(response.ok) {
        const jsonResponse = await response.json();
        console.log(jsonResponse);
      }
    } catch (error) {
      console.log(error);
    }
  }*/

  


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
        <h1>Jammming</h1>
      </header>
      
      <div>
        <h2>Add Your Favorite Spotify Songs!</h2>
      </div>

      <SearchBar setSearch={setSearch} value={search}/>

      <ul>
        {tests.map((test) => {
          return <SearchResults result={test} setSongs={setSongs} key={test.id}/>
        })}
      </ul>
      
      <div className="playlist">
        <input className="playlistTitle" onChange={(e) => setTitle(e.target.value)} value ={title}></input>
        <ul>
          {songs.map((song, index) => {
            song.playlistId = index
            return <Playlist song={song} id={song.id} setSongs={setSongs} key={index} />
          })}
        </ul>
      </div>

    </>
  )
}

export default App
