import { useEffect, useState } from "react";
import { getMovieCredits } from "../../api";
import { useParams } from "react-router-dom";
import style from "./MovieCast.module.css";

const defaultImg =
  "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

const MovieCast = () => {
  const { movieId } = useParams();
  const [casts, setCasts] = useState([]);

  useEffect(() => {
    if (!movieId) return;

    const fetchCast = async () => {
      try {
        const data = await getMovieCredits(movieId);
        setCasts(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchCast();
  }, [movieId]);

  return (
    <div className={style.cast}>
      {casts.length > 0 ? (
      <ul className={style.list}>
        {casts.map((actor) => (
          <li key={actor.id} className={style.item}>
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w200/${actor.profile_path}`
                  : defaultImg
              }
              alt={actor.name}
              width="100"
            />
            <div>
              <h3>{actor.name}</h3>
              <p>Character: {actor.character}</p>
            </div>
          </li>
        ))}
      </ul>) : <p>This movie don't have any casts.</p>}
    </div>
  );
};

export default MovieCast;
