import { useEffect, useState } from "react"
import { getTrendingMovies } from "../../api";
import MovieList from "../../components/MovieList/MovieList";
import style from './HomePage.module.css'

const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const results = await getTrendingMovies();
        setTrendingMovies(results);
      } catch (error) {
        console.error("Failed to load trending movies:", error);
      }
    };

    fetchTrending();
  }, []);

  return (
    <main className={style.home}>
    <h1 className={style.title}>Trending Today</h1>
    <MovieList movies={trendingMovies} />
  </main>
  )
}

export default HomePage