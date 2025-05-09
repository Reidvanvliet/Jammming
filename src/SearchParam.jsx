import React from 'react';

function SearchParam ({setSearchParam, value}) {
    
    return (
        <>
            <input type="submit" hidden/>
            <select className="search-param" name="params" id="params" value={value} onChange={({target}) => setSearchParam(target.value)} >
                <option value="track">Song</option>
                <option value="artist">Artist</option>
                <option value="album">Album</option>
            </select>
        </>
    )
}

export default SearchParam