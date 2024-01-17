import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { Rating } from "primereact/rating";

let API = "http://localhost:3000/api/";

function Account(props) {
  const [user, setUser] = useState([]);
  const [userComments, setUserComments] = useState([]);
  const [userReviews, setUserReviews] = useState([]);
  const [error, setError] = useState(null);
  const [commentToEdit, setCommentToEdit] = useState(null);
  const [updatedComment, setUpdatedComment] = useState("");

  const [reviewToEdit, setReviewToEdit] = useState(null);
  const [updatedReview, setUpdatedReview] = useState(""); //review comment
  const [updatedRating, setUpdatedRating] = useState(0); //review stars

  const [originalReviewId, setOriginalReviewId] = useState(null);
  const [originalUserId, setOriginalUserId] = useState(null);

  useEffect(() => {
    if (props.token) {
      fetchMyAccount();
    }
  }, [props.token]);

  // need this function to initally grab user info (user.id)
  async function fetchMyAccount() {
    try {
      const response = await fetch(`${API}/users/info`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${props?.token}`,
        },
      });

      const json = await response.json();
      setUser(json);
      await fetchMyAccountDetails(json?.id);
    } catch (error) {
      setError(error.message);
    }
  }

  // use this function with the user.id from other function to grab comment and review data
  async function fetchMyAccountDetails(id) {
    try {
      const response = await fetch(`${API}/users/details/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${props?.token}`,
        },
      });

      const json = await response.json();

      setUserComments(json.comments);
      setUserReviews(json.reviews);
    } catch (error) {
      console.error("Uh-OH! Can't fetch account details", error);
      setError(error.message);
    }
  }

  async function deleteReview(id) {
    try {
      const response = await fetch(`${API}/reviews/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${props?.token}`,
        },
      });
      const json = await response.json();

      fetchMyAccountDetails(user.id);
    } catch (error) {
      setError(error.message);
    }
  }

  async function deleteComment(id) {
    try {
      const response = await fetch(`${API}/comments/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${props?.token}`,
        },
      });
      const json = await response.json();

      fetchMyAccountDetails(user.id);
    } catch (error) {
      setError(error.message);
    }
  }

  function handleEditComment(id, updatedComment) {
    setCommentToEdit(id);
    setUpdatedComment(updatedComment);
  }
  function handleCancelEdit() {
    setCommentToEdit(null);
    setUpdatedComment("");
  }

  function handleEditReview(id, updatedReview, updatedRating) {
    setReviewToEdit(id);
    setUpdatedReview(updatedReview);
    setUpdatedRating(updatedRating);
  }
  function handleCancelEditReview() {
    setReviewToEdit(null);
    setUpdatedReview("");
    setUpdatedRating(0);
  }

  async function saveEditComment(reviewid, id, updatedComment) {
    try {
      const commentToUpdate = userComments.find((comment) => comment.id === id);
      if (!commentToUpdate) {
        console.error(`Comment with id ${id} not found.`);
        return;
      }

      const response = await fetch(`${API}/comments/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${props?.token}`,
        },
        body: JSON.stringify({
          content: updatedComment,
          reviewId: reviewid,
          userId: user?.id,
        }),
      });

      const jsonResponse = await response.json();

      if (jsonResponse.comment) {
        const updatedComments = userComments.map((comment) =>
          comment.id === id
            ? {
                ...jsonResponse.comment,
                userId: commentToUpdate.userId,
                reviewId: commentToUpdate.reviewId,
              }
            : comment
        );

        setUserComments(updatedComments);

        handleCancelEdit();
      } else {
        console.error("Comment not updated successfully.");
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  async function saveEditReview(id) {
    try {
      const body = {
        comment: updatedReview,
        rating: updatedRating,
      };

      const response = await axios.patch(`${API}/reviews/${id}`, body, {
        headers: {
          Authorization: `Bearer ${props?.token}`,
        },
      });

      if (response.status >= 200 && response.status < 300) {
        const updatedReviews = userReviews.map((review) => {
          return review.id === Number.parseInt(id)
            ? {
                ...response.data.review,
                userId: response.data.userid,
                reviewId: response.data.id,
              }
            : review;
        });

        setUserReviews(updatedReviews);

        handleCancelEditReview();
      } else {
        console.error("Review not updated successfully.");
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  function getAlbumById(albums, albumId) {
    return albums.find((album) => album?.id === albumId)?.title;
  }

  return (
    <div className="account-page-container">
      {error && <p>{error}</p>}

      <h1>Welcome, {user.name}!</h1>

      {props.token ? (
        <div className="review-container">
          <div className="review-history">
            <h2>My Reviews</h2>
            <ul>
              {userReviews && userReviews.length > 0 ? (
                userReviews.map((review) => (
                  <li key={review?.id}>
                    {reviewToEdit === review.id ? (
                      <>
                        <input
                          type="text"
                          placeholder={review.comment}
                          value={updatedReview}
                          onChange={(e) => setUpdatedReview(e.target.value)}
                        />
                        <div>
                          <Rating
                            className="star-rating"
                            id="rating"
                            value={updatedRating}
                            onChange={(e) => setUpdatedRating(e.value ?? 0)}
                            cancel={false}
                          />
                        </div>
                        <div className="account-button">
                          <button
                            value={review?.id}
                            onClick={(event) =>
                              saveEditReview(event.target.value)
                            }
                          >
                            Save
                          </button>
                          <button
                            onClick={() => handleCancelEditReview(review?.id)}
                          >
                            Cancel
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <h3>{review.comment}</h3>
                        <h4>Rating: </h4>
                        <Rating
                          className="star-rating"
                          id="rating"
                          value={review.rating}
                          readOnly
                          cancel={false}
                        />
                        <div className="account-button">
                          <button onClick={() => deleteReview(review?.id)}>
                            Delete Review
                          </button>
                          <button
                            onClick={() =>
                              handleEditReview(
                                review.id,
                                updatedReview,
                                updatedRating
                              )
                            }
                          >
                            Edit Review
                          </button>
                        </div>
                      </>
                    )}
                  </li>
                ))
              ) : (
                <p>No reviews available.</p>
              )}
            </ul>
          </div>
          <hr></hr>
          <div className="comment-history">
            <h2>My Comments</h2>
            <ul>
              {userComments && userComments.length > 0 ? (
                userComments.map((comment) => (
                  <li key={comment?.id}>
                    {commentToEdit === comment.id ? (
                      <>
                        <input
                          type="text"
                          placeholder={comment.content}
                          value={updatedComment}
                          onChange={(e) => setUpdatedComment(e.target.value)}
                        />
                        <div className="account-button">
                          <button
                            value={comment?.reviewid}
                            onClick={(event) =>
                              saveEditComment(
                                event?.target?.value,
                                comment?.id,
                                updatedComment
                              )
                            }
                          >
                            Save
                          </button>
                          <button onClick={() => handleCancelEdit(comment?.id)}>
                            Cancel
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <h3>{comment.content}</h3>
                        <div className="account-button">
                          <button onClick={() => deleteComment(comment?.id)}>
                            Delete Comment
                          </button>
                          <button
                            onClick={() =>
                              handleEditComment(comment?.id, updatedComment)
                            }
                          >
                            Edit Comment
                          </button>
                        </div>
                      </>
                    )}
                  </li>
                ))
              ) : (
                <p>No comments available.</p>
              )}
            </ul>
          </div>
        </div>
      ) : (
        <p>
          It seems you are not logged in, click here:{" "}
          <Link to="/login">Login</Link>
        </p>
      )}
    </div>
  );
}

export default Account;
