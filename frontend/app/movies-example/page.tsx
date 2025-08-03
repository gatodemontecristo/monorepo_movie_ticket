'use client';

import React, { useEffect, useState } from 'react';
import { movieService } from '../../services/movie.service';
import { Movie, MovieChange } from '../../types/tmdb';
import { buildImageUrl, IMAGE_SIZES } from '../../config/tmdb';
import { useGetMoviesHomepage } from '@/hooks/useMovies';

export default function MoviesExample() {
  const { data: movies, isLoading, error } = useGetMoviesHomepage();

  if (isLoading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <div className='text-movie-duck text-xl'>Loading movies...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <div className='text-red-500 text-xl'>
          Error:{' '}
          {typeof error === 'string'
            ? error
            : (error?.message ?? String(error))}
        </div>
      </div>
    );
  }

  return (
    <div className='bg-movie-black min-h-screen p-8'>
      <h1 className='text-4xl font-bold text-movie-duck mb-8 font-mont'>
        TMDB API Integration Example
      </h1>

      {/* Movie Changes Section */}
      <section className='mb-12'>
        <h2 className='text-2xl font-bold text-movie-duck mb-6 font-mont'>
          Recent Movie Changes
        </h2>
      </section>

      {/* Popular Movies */}
      <section className='mb-12'>
        <h2 className='text-2xl font-bold text-movie-duck mb-6 font-mont'>
          Popular Movies
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {movies?.popular.slice(0, 8).map((movie: Movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      {/* Top Rated Movies */}
      <section className='mb-12'>
        <h2 className='text-2xl font-bold text-movie-duck mb-6 font-mont'>
          Top Rated Movies
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {movies?.topRated.slice(0, 8).map((movie: Movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      {/* Upcoming Movies */}
      <section>
        <h2 className='text-2xl font-bold text-movie-duck mb-6 font-mont'>
          Upcoming Movies
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {movies?.upcoming.slice(0, 8).map((movie: Movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>
    </div>
  );
}

// Movie Card Component
interface MovieCardProps {
  movie: Movie;
}

function MovieCard({ movie }: MovieCardProps) {
  const posterUrl = buildImageUrl(movie.poster_path, IMAGE_SIZES.POSTER.MEDIUM);

  return (
    <div className='bg-movie-metal/10 rounded-lg overflow-hidden border border-movie-metal hover:border-movie-duck transition-colors'>
      {posterUrl && (
        <img
          src={posterUrl}
          alt={movie.title}
          className='w-full h-64 object-cover'
        />
      )}
      <div className='p-4'>
        <h3 className='text-movie-duck font-mont font-bold text-lg mb-2 line-clamp-2'>
          {movie.title}
        </h3>
        <p className='text-movie-metal text-sm mb-2'>
          Release: {movie.release_date}
        </p>
        <div className='flex justify-between items-center'>
          <span className='text-movie-yellow font-caros'>
            ⭐ {movie.vote_average.toFixed(1)}
          </span>
          <span className='text-movie-metal text-sm'>
            {movie.vote_count} votes
          </span>
        </div>
        <p className='text-movie-metal text-sm mt-2 line-clamp-3'>
          {movie.overview}
        </p>
      </div>
    </div>
  );
}
