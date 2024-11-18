// src/app/movie/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

// TypeScript interfaces
interface Genre {
  id: number;
  name: string;
}

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  genres: Genre[];
}

interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export default function MovieDetail() {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [cast, setCast] = useState<CastMember[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const params = useParams();
  const movieId = params?.id;

  useEffect(() => {
    if (!movieId) return;

    const fetchMovieDetails = async () => {
      const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

      try {
        // Fetch movie details
        const movieRes = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`
        );
        if (!movieRes.ok) throw new Error("Failed to fetch movie details");
        const movieData: Movie = await movieRes.json();
        setMovie(movieData);

        // Fetch cast details
        const castRes = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`
        );
        if (!castRes.ok) throw new Error("Failed to fetch cast details");
        const castData = await castRes.json();
        setCast(castData.cast.slice(0, 10)); // Show only top 10 cast members
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  // Check if movie is in favorites
  useEffect(() => {
    if (movie) {
      const favorites: Movie[] = JSON.parse(localStorage.getItem("favorites") || "[]");
      setIsFavorite(favorites.some((fav) => fav.id === movie.id));
    }
  }, [movie]);

  // Add/Remove movie from favorites
  const handleFavorite = () => {
    const favorites: Movie[] = JSON.parse(localStorage.getItem("favorites") || "[]");
    if (isFavorite) {
      const updatedFavorites = favorites.filter((fav) => fav.id !== movie?.id);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setIsFavorite(false);
    } else if (movie) {
      favorites.push(movie);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  if (error) return <div className="text-red-500 text-center mt-10">Error: {error}</div>;
  if (!movie) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Movie Details Section */}
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full md:w-1/3 rounded-lg shadow-lg"
        />
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
          <p className="text-gray-600 mb-6">{movie.overview}</p>
          <div className="space-y-2">
            <p><strong>Release Date:</strong> {movie.release_date}</p>
            <p><strong>Rating:</strong> {movie.vote_average} / 10</p>
            <p><strong>Genres:</strong> {movie.genres.map((genre) => genre.name).join(", ")}</p>
          </div>
          <button
            onClick={handleFavorite}
            className={`mt-6 py-2 px-4 rounded text-white ${
              isFavorite ? "bg-red-500" : "bg-blue-500"
            }`}
          >
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </button>
        </div>
      </div>

      {/* Cast Section */}
      <div className="max-w-5xl mx-auto mt-10">
        <h2 className="text-3xl font-semibold mb-6">Top Cast</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {cast.map((member) => (
            <div key={member.id} className="bg-white rounded-lg shadow-md p-4">
              <img
                src={
                  member.profile_path
                    ? `https://image.tmdb.org/t/p/w200${member.profile_path}`
                    : "https://via.placeholder.com/200x300?text=No+Image"
                }
                alt={member.name}
                className="w-full h-64 object-cover rounded"
              />
              <h3 className="text-lg font-bold mt-4">{member.name}</h3>
              <p className="text-gray-500">as {member.character}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
