import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
      <header>
        <h1>Jammming</h1>
      </header>
      <body>
        <div>
          <h2>Add Your Favorite Spotify Songs!</h2>
        </div>

        //probably import this with a searchBar component
        <div className="search">
          <img className='searchIcon'/>
          <select name="params" id="params">
            <option value="song" selected>Song</option>
            <option value="genre" selected>Genre</option>
            <option value="artist" selected>Artist</option>
            <option value="album" selected>Album</option>
          </select>
        </div>

        <div className='results'>
          //these are added with our searchResults component
          <img className="albumCover"/>
          <p>{songname}</p>
          <p>{artist}</p>
          <button className="add">+</button>
        </div>

        <div className="playlist">
          <h3>{playlistTitle}</h3>
          <button className="editTitle"><img id="littlePencil"/></button>
          //these are added with our AddSong component
          <p>{songname}</p>
          <p>{artist}</p>
          <button className="delete">-</button>
          <button className="saveSpotify">Save to Spotify</button>
        </div>
      </body>
    </>
  )
}

export default App
