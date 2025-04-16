import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
  },
});

export const getTrendingMovies = async () => {
  const { data } = await axiosInstance.get("/trending/movie/day", {
      params: { language: "en-US" },
    });
  return data.results;
};

// 🔎 Пошук фільмів
export const searchMovies = async (query) => {
  const { data } = await axiosInstance.get("/search/movie", {
    params: {
      query,
      include_adult: false,
      language: "en-US",
      page: 1,
    },
  });
  return data.results;
};

export const getMovieDetails = async (movieId) => {
  const {data} = await axiosInstance.get(`/movie/${movieId}`, {
    params: { language: "en-US" },
  })
  return data;
};

export const getMovieCredits = async (movieId) => {
  const {data} = await axiosInstance.get(`/movie/${movieId}/credits`, {
    params: { language: "en-US" },
  });
  return data.cast;
};

export const getMovieReviews = async (movieId) => {
  const {data} = await axiosInstance.get(`/movie/${movieId}/reviews`, {
    params: { language: "en-US" },
  });
  return data.results;
};
