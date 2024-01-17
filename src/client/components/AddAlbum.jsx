import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

let API = "http://localhost:3000/api/";

function AddAlbum(props) {
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    genre: "",
    releaseDate: "",
    imgUrl: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.releaseDate = new Date(formData.releaseDate).getFullYear();
    const response = await axios.post(`${API}/albums`, formData, {
      headers: {
        Authorization: `Bearer ${props?.token}`,
      },
    });

    if (response.status >= 200 && response.status < 300) {
      navigate("/");
    }
  };

  return (
    <form className="add-album-form" onSubmit={handleSubmit}>
      <h2>Add an Album</h2>
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
        />
      </label>
      <br />

      <label>
        Artist:
        <input
          type="text"
          name="artist"
          value={formData.artist}
          onChange={handleInputChange}
        />
      </label>
      <br />

      <label>
        Genre:
        <input
          type="text"
          name="genre"
          value={formData.genre}
          onChange={handleInputChange}
        />
      </label>
      <br />

      <label>
        Release Date:
        <input
          type="date"
          name="releaseDate"
          value={formData.releaseDate}
          onChange={handleInputChange}
        />
      </label>
      <br />

      <label>
        Image URL:
        <input
          type="text"
          name="imgUrl"
          value={formData.imgUrl}
          onChange={handleInputChange}
        />
      </label>
      <br />

      <button type="submit">Submit</button>
    </form>
  );
}

export default AddAlbum;
