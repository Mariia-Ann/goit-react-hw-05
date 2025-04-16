import { useEffect, useRef, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import { getMovieDetails } from "../../api";
import Loader from "../../components/Loader/Loader";
import { BiArrowBack } from "react-icons/bi";
import style from "./MovieDetailsPage.module.css";
import clsx from "clsx";

const defaultImg =
  "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const backLink = useRef(location.state?.from ?? "/movies");

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    if (!movieId) return;

    const fetchDetails = async () => {
      try {
        const data = await getMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchDetails();
  }, [movieId]);

  if (!movie) return <Loader />;

  const { title, overview, genres, poster_path, release_date } = movie;

   const setActiveClass = ({ isActive }) => {
          return clsx(style.movieNav, isActive && style.active)
      }

  return (
    <main className={style.moviePage}>
      <Link className={style.back} to={backLink.current}>
        <BiArrowBack /> Back to movies
      </Link>
      <div className={style.movie}>
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500/${poster_path}`
              : defaultImg
          }
          width={250}
          alt={title}
        />
        <div className={style.card}>
            <h2>
              {title} {release_date && `(${release_date.slice(0, 4)})`}
            </h2>
            <h3>Genres</h3>
            <p>{genres.map((genre) => genre.name).join(", ")}</p>
            <h3>Overview</h3>
            <p>{overview}</p>
        </div>
        
      </div>
      <div className={style.info}>
          <h3 className={style.titleInfo}>Additional information</h3>
          <ul className={style.movieInfo}>
            <li>
              <NavLink className={setActiveClass} to="cast">Cast</NavLink>
            </li>
            <li>
              <NavLink className={setActiveClass} to="reviews">Reviews</NavLink>
            </li>
          </ul>
          <Outlet />
          </div>
    </main>
  );
};

export default MovieDetailsPage;
