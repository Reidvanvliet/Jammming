import React, { useState } from 'react';

function SearchBar ({setSearch, value}) {

return (
    <input className="search-bar" type="text" onChange={(e) => setSearch(e.target.value)} value={value}></input>
)};

export default SearchBar;


