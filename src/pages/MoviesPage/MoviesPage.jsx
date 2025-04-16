import { Link, useSearchParams } from "react-router-dom";
import SearchForm from "../../components/SearchForm/SearchForm";
import { useEffect, useState } from "react";
import { searchMovies } from "../../api";
import style from "./MoviesPage.module.css";
import Loader from "../../components/Loader/Loader";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  // const [hasSearched, setHasSearched] = useState(false);
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
        // setHasSearched(true);
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
            <li key={movie.id}>
              <Link
                className={style.item}
                to={`/movies/${movie.id}`}
                state={{ from: `/movies?query=${movieName}` }}
              >
                {movie.title || movie.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MoviesPage;
