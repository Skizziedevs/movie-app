"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// Define TypeScript interface for Movie
interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

export default function Favorites() {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  // Fetch favorites from localStorage on component mount
  useEffect(() => {
    // Check if localStorage is available (important for Next.js SSR)
    if (typeof window !== "undefined") {
      const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
      setFavorites(storedFavorites);
    }
  }, []);

  // Remove movie from favorites
  const removeFavorite = (id: number) => {
    const updatedFavorites = favorites.filter((movie) => movie.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  if (favorites.length === 0) {
    return <div className="p-8 text-center text-gray-600">No favorite movies added.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Favorite Movies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {favorites.map((movie) => (
          <div
            key={movie.id}
            className="bg-white p-4 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-64 object-cover rounded"
            />
            <h2 className="text-xl font-bold mt-4">{movie.title}</h2>
            <div className="mt-4 flex justify-between items-center">
              <button
                onClick={() => removeFavorite(movie.id)}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
              >
                Remove
              </button>
              <Link href={`/movie/${movie.id}`} className="text-blue-500 hover:text-blue-700 transition ml-[0.7rem]">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
