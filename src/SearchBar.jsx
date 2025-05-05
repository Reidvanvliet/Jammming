import React, { useState } from 'react';

function SearchBar (props) {

return (
    <div className="search">
          <form>
            <input className="searchbar" type="text" onChange={(e) => props.setSearch(e.target.value)} value={props.value}></input>
            <input type="submit" hidden/>
            
            <select  name="params" id="params" defaultValue="song">
                <option value="song" >Song</option>
                <option value="genre">Genre</option>
                <option value="artist">Artist</option>
                <option value="album">Album</option>
            </select>
          </form>
        </div>
)};

export default SearchBar;


