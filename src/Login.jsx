import React, { useState, useEffect } from 'react'

function Login ({redirectToSpotifyLogin, loginAccessToken, userData}) {
    
      return (
        <div className="login">
            {!loginAccessToken ? <button onClick={redirectToSpotifyLogin}>Login</button> : <h2>{userData.display_name}</h2> }
        </div>
      )
}

export default Login;