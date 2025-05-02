import React, { useState } from 'react'
import './App.css'
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';


function App() {
  const [search, setSearch] = useState("");
  const [songs, setSongs] = useState([]);
  const [title, setTitle] = useState("Playlist Title");

  const searchSongs = async (search) => {
    try {
      const response = await fetch(URL);
      if(response.ok) {
        const jsonResponse = await response.json();
        console.log(jsonResponse);
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <>
      <header>
        <h1>Jammming</h1>
      </header>
      
      <div>
        <h2>Add Your Favorite Spotify Songs!</h2>
      </div>

      <SearchBar setSearch={setSearch} value={search} />

      <ul>
        {jsonResponse.map((searchResult) => {
          <SearchResults searchResult={searchResult} setSongs={setSongs} />
        })}
      </ul>

      <div className="playlist">
        <input className="playlistTitle" onChange={(e) => setTitle(e.target.value)} value ={title}></input>
        <ul>
          {songs.map((song) => {
            <Playlist song={song} id={song.id} />
          })}
        </ul>
      </div>
      
    </>
  )
}

export default App
