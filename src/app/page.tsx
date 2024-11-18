"use client";

import Head from 'next/head';
import { useEffect, useState } from 'react';
import Link from 'next/link';

// Define TypeScript interfaces for strong type enforcement
interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
}

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1); // Track the current page
  const [isFetching, setIsFetching] = useState(false); // Track if more movies are being fetched

  // Fetch Movies from TMDB API
  const fetchMovies = async (page: number) => {
    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    setIsFetching(true);
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`
      );
      if (!res.ok) {
        throw new Error('Failed to fetch movies');
      }
      const data = await res.json();
      setMovies((prevMovies) => [...prevMovies, ...data.results]);
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchMovies(page);
  }, [page]);

  // Handle infinite scroll
  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      !isFetching &&
      !loading
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isFetching, loading]);

  // Filter movies based on search query
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Head>
        <title>Movie Library</title>
        <meta name="description" content="A Movie Library App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gray-100 px-4 py-8">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-5xl font-bold text-blue-600">Movie Library</h1>
          <p className="text-gray-600 mt-2">Discover your favorite movies</p>
          <Link href="/favourites" className="text-blue-500 mt-2 inline-block">
            View Favorites
          </Link>
        </header>

        {/* Search Bar */}
        <div className="flex justify-center mb-10">
          <input
            type="text"
            placeholder="Search for movies..."
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Movie Grid or Loading Spinner */}
        {loading && page === 1 ? (
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
          </div>
        ) : error ? (
          <p className="text-center text-red-500 col-span-full">{error}</p>
        ) : filteredMovies.length > 0 ? (
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
           {filteredMovies.map((movie, index) => (
  <Link
    key={`${movie.id}-${index}`}
    href={`./movie/${movie.id}`}
    className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-transform"
  >
    <img
      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
      alt={movie.title}
      className="w-full h-64 object-cover"
    />
    <div className="p-4">
      <h2 className="text-xl font-semibold">{movie.title}</h2>
      <p>
        <strong>Release Date:</strong> {movie.release_date}
      </p>
      <p className="text-yellow-500 font-semibold mt-2">
        ⭐ Average Rating: {movie.vote_average} / 10
      </p>
    </div>
  </Link>
))}

          </section>
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No movies found
          </p>
        )}

        {/* Loading Spinner for Infinite Scroll */}
        {isFetching && (
          <div className="flex items-center justify-center py-10">
            <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-b-4 border-blue-500"></div>
          </div>
        )}
      </main>
    </>
  );
}
