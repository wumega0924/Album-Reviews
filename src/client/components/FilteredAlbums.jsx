import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function FilteredAlbums({ albums, searchTerm }) {
  const [filteredAlbums, setFilteredAlbums] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    handleSearch(searchTerm);
  }, [searchTerm]);

  const handleSearch = (term) => {
    const filtered = filterAlbums(term, albums);
    setFilteredAlbums(filtered);
  };

  function filterAlbums(searchTerm, albums) {
    const filtered = albums.filter((album) => {
      const titleLower = album.title.toLowerCase();
      const artistLower = album.artist.toLowerCase();
      const genreLower = album.genre.toLowerCase();
      const searchTermLower = searchTerm.toLowerCase();

      return (
        titleLower.includes(searchTermLower) ||
        artistLower.includes(searchTermLower) ||
        genreLower.includes(searchTermLower)
      );
    });

    return filtered;
  }

  return (
    <ul className="albums-container">
      {filteredAlbums.map((album) => (
        <li key={album.id} className="all-albums-details">
          <h2>{album.title}</h2>
          <h3>{album.artist}</h3>
          <img src={album.imgurl} alt={album.title} className="all-album-img" />
          <button onClick={() => navigate(`/albums/${album.id}`)}>
            Show Details
          </button>
        </li>
      ))}
    </ul>
  );
}

export default FilteredAlbums;
