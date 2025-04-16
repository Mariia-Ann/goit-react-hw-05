import { Link, useLocation } from "react-router-dom";
import style from './MovieList.module.css'

const MovieList = ({ movies }) => {
  const location = useLocation();
  return (
    <ul className={style.list}>
      {movies.map((movie) => (
        <li key={movie.id}>
          <Link className={style.item} to={`/movies/${movie.id}`} state={{ from: location }}>
            {movie.title || movie.name}</Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
