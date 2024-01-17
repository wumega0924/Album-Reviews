import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Rating } from "primereact/rating";
import { Button } from "primereact/button";

let API = "http://localhost:3000/api/";

function AlbumReviews(props) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {}, []);

  async function handleSubmit() {
    const postData = {
      userId: props?.user?.id,
      albumId: id,
      rating: rating,
      comment: comment,
      reviewDate: new Date().toISOString(),
    };

    try {
      const response = await axios.post(`${API}/reviews`, postData, {
        headers: {
          Authorization: `Bearer ${props?.token}`,
        },
      });

      if (response.status >= 200 && response.status < 300) {
        navigate(`/albums/${id}`);
      }
    } catch (err) {
      console.error("Unable to find that review: ", err.message);
    }
  }

  return (
    <div className="reviews-form">
      <div className="review-form-rating">
        <label htmlFor="rating" className="review-title">
          Rating & Review{" "}
        </label>
        <p>Add your star rating and review below.</p>
        <div className="star-rating-2">
          <Rating
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.value ?? 0)}
            cancel={false}
          />
        </div>
      </div>

      <div className="review-form-text">
        <label htmlFor="comment">Review: </label>
        <textarea
          type="text"
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
      </div>
      <div className="review-form-button">
        <Button label="Submit" onClick={handleSubmit} />
      </div>
    </div>
  );
}

export default AlbumReviews;
