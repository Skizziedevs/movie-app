const API_BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovieDetails = async (movieId: string) => {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const response = await fetch(`${API_BASE_URL}/movie/${movieId}?api_key=${apiKey}&language=en-US`);
  if (!response.ok) {
    throw new Error('Failed to fetch movie details');
  }
  return response.json();
};

export const fetchMovieCredits = async (movieId: string) => {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const response = await fetch(`${API_BASE_URL}/movie/${movieId}/credits?api_key=${apiKey}`);
  if (!response.ok) {
    throw new Error('Failed to fetch cast details');
  }
  return response.json();
};
