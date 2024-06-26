import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { requestReviewsById } from "../../services/api";

import css from "./MovieReviews.module.css";
const MovieReviews = () => {
  const { movieId } = useParams();

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await requestReviewsById(movieId);
        setReviews(data.results);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [movieId]);

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      {reviews.length === 0 ? (
        <p>No reviews found. Add your first review!</p>
      ) : (
        <ul>
          {reviews.map((item) => (
            <li className={css.reviewItem} key={item.id}>
              <p className={css.reviewAuthor}>{item.author}</p>
              <p>{item.content}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default MovieReviews;
