import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";

let API = "http://localhost:3000/api/";

function Comments(props) {
  const [comment, setComment] = useState("");

  const navigate = useNavigate();

  const { id, reviewId } = useParams();

  useEffect(() => {}, []);

  async function handleSubmit() {
    const postData = {
      userId: props?.user?.id,
      reviewId: reviewId,
      content: comment,
    };

    try {
      const response = await axios.post(`${API}/comments`, postData, {
        headers: {
          Authorization: `Bearer ${props?.token}`,
        },
      });

      if (response.status >= 200 && response.status < 300) {
        navigate(`/albums/${id}`);
      }
      text;
    } catch (err) {
      console.error("Unable to submit that comment: ", err.message);
    }
  }

  return (
    <div className="comment-form">
      <div className="comment-form-entry">
        <h2>Comment on a Review</h2>
        <label htmlFor="comment">Comment: </label>
        <textarea
          type="text"
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
      </div>
      <div className="comment-submit-button">
        <button label="Submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default Comments;
