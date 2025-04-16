import { Link, useSearchParams } from "react-router-dom";
import SearchForm from "../../components/SearchForm/SearchForm";
import { useEffect, useState } from "react";
import { searchMovies } from "../../api";
import style from "./MoviesPage.module.css";
import Loader from "../../components/Loader/Loader";

const defaultImg =
  "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";


const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const movieName = searchParams.get("query") ?? "";

  useEffect(() => {
    if (!movieName) return;

    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        const results = await searchMovies(movieName);
        setMovies(results);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [movieName]);

  const handleSubmit = (value) => {
    setSearchParams(value !== "" ? { query: value } : {});
    setMovies([]);
  };

  return (
    <div className={style.movies}>
      <SearchForm onSubmit={handleSubmit} />

      {isLoading && <Loader />}

      {!isLoading && movieName && movies.length === 0 && (
        <p>We don't have any movies "{movieName}". Try again!</p>
      )}

      {movies.length > 0 && (
        <ul className={style.list}>
          {movies.map((movie) => (
            <li key={movie.id} className={style.item}>
              <Link
                className={style.itemLink}
                to={`/movies/${movie.id}`}
                state={{ from: `/movies?query=${movieName}` }}
              >
                <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                  : defaultImg
              }
              width={250}
              height={350}
              alt={movie.title}
            />
                <p className={style.name}>{movie.title || movie.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MoviesPage;
