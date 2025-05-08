import React, { useState, useEffect } from 'react'
import './App.css'
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Playlist from './Playlist';
import Login from './Login';

const clientId = "2fac4d8b00b74fa7912463fa0d1f5b9f";
const clientSecret = "da6d7503439f4bd58dcc074700cbf86a";
const redirectUri = "http://127.0.0.1:5173"
const scopes = "playlist-modify-private playlist-modify-public user-read-private"


function App() {
  const [search, setSearch] = useState("");
  const [songs, setSongs] = useState([]);
  const [playlistSongs, setPlaylistSongs] = useState([]);
  const [title, setTitle] = useState("");
  const [accessToken, setAccessToken] = useState(null);
  const [loginAccessToken, setLoginAccessToken] = useState(null);
  const [userData, setUserData] = useState("");

  
  let uniqueIdCounter = 0;

  const generateUniqueId = () => {
      const uniqueId = uniqueIdCounter;
      uniqueIdCounter++;
      return uniqueId;
  }

  //Get access token and search data without having to login

  const getAccessTokenWithoutLogin = async () => {
      try {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
              body: new URLSearchParams({
          'grant_type': 'client_credentials',
          'client_id': clientId,
          'client_secret': clientSecret
              })
          });
            if(response.ok) {
              const jsonResponse = await response.json();
              setAccessToken(jsonResponse.access_token)
            }
      } catch (error) {
          console.log(error);
      }
  }

  const getSearchData = async (accessToken) => {
    try {
      const response = await fetch(`https://api.spotify.com/v1/search?q=${search}&type=track`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
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
    if(!accessToken) {
      getAccessTokenWithoutLogin();
    }
  },[])
  
  useEffect(() => {
    if (search) {
      getSearchData(accessToken).then((searchData) => handleData(searchData.tracks.items))
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

  //Login to Spotify account and get user data.

    const redirectToSpotifyLogin = () => {
        const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scopes}`;
        sessionStorage.setItem("playlist", JSON.stringify(playlistSongs));
        window.location.href = authUrl; 
      };

    const getAuthCodeFromURL = () => {
        const params = new URLSearchParams(window.location.search);
        const authCode = params.get("code");

        if (authCode) {
            window.history.replaceState({}, document.title, window.location.pathname);
          }
      
        return authCode;
    };

    const getAccessToken = async (authCode) => {
        if(!authCode) return;

        try {
            const response = await fetch("https://accounts.spotify.com/api/token", {
                method: "POST",
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded",
                    "Authorization": "Basic " + btoa(clientId + ":" + clientSecret),
                },
                body: new URLSearchParams({
                    grant_type: "authorization_code",
                    code: authCode,
                    redirect_uri: redirectUri,
                })
            });

            const data = await response.json();

            if(data.access_token) {
                setLoginAccessToken(data.access_token);

                alert("✅ You have logged in successfully to your Spotify account!")
            } else {
                console.error("❌ Error getting access token:", data);
                alert("❌ Error getting access token. Please try logging in again.")
            }
        } catch (error) {
            console.error("❌ Error in token request:", error);
            alert("❌ Network error. Please try again.");
        }
    };

    useEffect(() => {
        const authCode = getAuthCodeFromURL();
        if (authCode && !loginAccessToken) {
            getAccessToken(authCode);
        }
        if (loginAccessToken) {
            getUserData(loginAccessToken);
            const playlist = sessionStorage.getItem("playlist")
            setPlaylistSongs(JSON.parse(playlist));
        }
      }, [loginAccessToken]);

    const getUserData = async (loginAccessToken) => {
        try {
            const response = await fetch('https://api.spotify.com/v1/me', {
            headers: {
                'Authorization': `Bearer ${loginAccessToken}`
            }
              })
            if(response.ok) {
                const jsonResponse = await response.json();
                setUserData(jsonResponse);
            }
        } catch (error) {
            console.log(error);
        }
    }

    //Save playlist to Spotify with tracks

    const createNewPlaylist = async () => {
      if(!loginAccessToken) {
        return alert("❌ Please login to Spotify first!")
      }
      
      if(!title) {
        return alert("❌ Please set a title!")
      }

      try {
        const response = await fetch(`https://api.spotify.com/v1/users/${userData.id}/playlists`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${loginAccessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'name': title,
            'description': 'Playlist made through Jammming',
            'public': false
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

    const addPlaylistTracks = async (playlist) => {
      if (!title || !loginAccessToken) return

      try {
        const requestBody = playlistSongs.map((playlistSong) => `spotify:track:${playlistSong.id}`);
        const response = await fetch(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${loginAccessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'uris': requestBody,
            'position': 0
          })
        });

        if(response.ok) {
          alert("✅ Playlist added to your Spotify account!")
        }
      } catch (error) {
        console.log(error);
      }
    }

    //Render our application

  return (
    <>
      <header>
        <div className="forStylePoints"></div>
        <h1>Ja<span>mmm</span>ing</h1>
        <Login redirectToSpotifyLogin={redirectToSpotifyLogin} userData={userData} loginAccessToken={loginAccessToken} />
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
              <input className="playlist-title" onChange={(e) => setTitle(e.target.value)} value ={title} placeholder='Your Playlist Title'></input>
            </li>
            {playlistSongs.map((playlistSong) => {
              playlistSong.playlistId = generateUniqueId();
              return <Playlist playlistSong={playlistSong} id={playlistSong.id} setPlaylistSongs={setPlaylistSongs} key={playlistSong.playlistId} />
            })}
            <li className="save">
              <button onClick={() => {
                createNewPlaylist().then((playlist) => addPlaylistTracks(playlist))
              }}>Save to Spotify</button>
            </li>
          </ul>
        </div>
        <div className="footer"></div>
      </div>

      
    </>
  )
}

export default App
