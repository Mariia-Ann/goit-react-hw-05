import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieReviews } from "../../api";
import style from './MovieReviews.module.css';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
      if (!movieId) return;
  
      const fetchReviews = async () => {
        try {
          const data = await getMovieReviews(movieId);
          setReviews(data);
        } catch (error) {
          console.error("Error:", error);
        }
      };
      fetchReviews();
    }, [movieId]);

  return (
    <div className={style.review}>
      {reviews.length > 0 ? (
    <ul className={style.list}>
      {reviews.map((review) => (
        <li key={review.id}>
          <h4 className={style.author}>Author: {review.author}</h4>
          <p><strong>Review: </strong>{review.content}</p>
        </li>
      ))}
      
      </ul>) : <p>We don't have any rewiews for this movie.</p>}
       </div>
  )
}

export default MovieReviews