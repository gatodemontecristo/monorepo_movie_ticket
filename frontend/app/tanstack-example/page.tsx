'use client';

import React from 'react';
import { useGetMoviesHomepage } from '@/hooks/useGetMoviesHomepage';
import { useMovieChanges, useInfinitePopularMovies } from '@/hooks/useMovies';
import { buildImageUrl, IMAGE_SIZES } from '@/config/tmdb';

export default function TanStackQueryExample() {
  // Hook para homepage
  const {
    movies,
    isLoading: homepageLoading,
    error: homepageError,
    refetch,
  } = useGetMoviesHomepage();

  // Hook para cambios (tu endpoint específico)
  const { data: changes, isLoading: changesLoading } = useMovieChanges(1);

  // Hook para scroll infinito
  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfinitePopularMovies();

  if (homepageLoading) {
    return (
      <div className='flex justify-center items-center min-h-screen bg-movie-black'>
        <div className='text-movie-duck text-xl'>
          Loading with TanStack Query...
        </div>
      </div>
    );
  }

  if (homepageError) {
    return (
      <div className='flex flex-col justify-center items-center min-h-screen bg-movie-black'>
        <div className='text-red-500 text-xl mb-4'>
          Error: {homepageError.message}
        </div>
        <button
          onClick={() => refetch()}
          className='bg-movie-duck text-movie-black px-4 py-2 rounded font-caros'
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className='bg-movie-black min-h-screen p-8'>
      <h1 className='text-4xl font-bold text-movie-duck mb-8 font-mont'>
        TanStack Query Integration 🚀
      </h1>

      {/* Movie Changes Section */}
      <section className='mb-12'>
        <h2 className='text-2xl font-bold text-movie-duck mb-6 font-mont'>
          Movie Changes (Auto-refresh every 5 min)
        </h2>
        {changesLoading ? (
          <div className='text-movie-metal'>Loading changes...</div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            {changes?.results.slice(0, 8).map(change => (
              <div
                key={change.id}
                className='bg-movie-metal/10 p-4 rounded-lg border border-movie-metal'
              >
                <p className='text-movie-duck font-caros'>
                  Movie ID: {change.id}
                </p>
                {change.adult !== undefined && (
                  <p className='text-movie-metal text-sm'>
                    Adult: {change.adult ? 'Yes' : 'No'}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Homepage Movies */}
      {movies && (
        <>
          <section className='mb-12'>
            <h2 className='text-2xl font-bold text-movie-duck mb-6 font-mont'>
              Popular Movies (Cached)
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
              {movies.popular.slice(0, 4).map(movie => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </section>

          <section className='mb-12'>
            <h2 className='text-2xl font-bold text-movie-duck mb-6 font-mont'>
              Top Rated Movies (Cached)
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
              {movies.topRated.slice(0, 4).map(movie => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </section>
        </>
      )}

      {/* Infinite Scroll Section */}
      <section className='mb-12'>
        <h2 className='text-2xl font-bold text-movie-duck mb-6 font-mont'>
          Infinite Scroll - Popular Movies
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {infiniteData?.pages.map((page, pageIndex) =>
            page.results.map(movie => (
              <MovieCard key={`${pageIndex}-${movie.id}`} movie={movie} />
            )),
          )}
        </div>

        {hasNextPage && (
          <div className='text-center mt-8'>
            <button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className='bg-movie-duck hover:bg-movie-yellow text-movie-black font-bold py-3 px-6 rounded-lg disabled:opacity-50 font-caros'
            >
              {isFetchingNextPage ? 'Loading more...' : 'Load More Movies'}
            </button>
          </div>
        )}
      </section>

      {/* Benefits Section */}
      <section className='bg-movie-metal/10 rounded-lg p-6 border border-movie-metal'>
        <h2 className='text-2xl font-bold text-movie-duck mb-4 font-mont'>
          TanStack Query Benefits ✨
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-movie-metal'>
          <div>
            <h3 className='text-movie-duck font-bold mb-2'>
              Automatic Features:
            </h3>
            <ul className='space-y-1 text-sm'>
              <li>• Background refetching</li>
              <li>• Intelligent caching</li>
              <li>• Automatic retries</li>
              <li>• Stale-while-revalidate</li>
              <li>• Request deduplication</li>
            </ul>
          </div>
          <div>
            <h3 className='text-movie-duck font-bold mb-2'>
              Developer Experience:
            </h3>
            <ul className='space-y-1 text-sm'>
              <li>• DevTools integration</li>
              <li>• TypeScript support</li>
              <li>• Infinite queries</li>
              <li>• Optimistic updates</li>
              <li>• Cache invalidation</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

// Movie Card Component (reutilizable)
interface MovieCardProps {
  movie: {
    id: number;
    title: string;
    poster_path: string | null;
    vote_average: number;
    release_date: string;
    overview: string;
  };
}

function MovieCard({ movie }: MovieCardProps) {
  const posterUrl = buildImageUrl(movie.poster_path, IMAGE_SIZES.POSTER.MEDIUM);

  return (
    <div className='bg-movie-metal/10 rounded-lg overflow-hidden border border-movie-metal hover:border-movie-duck transition-colors group'>
      {posterUrl && (
        <div className='relative overflow-hidden'>
          <img
            src={posterUrl}
            alt={movie.title}
            className='w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300'
          />
          <div className='absolute top-2 right-2 bg-movie-black/80 text-movie-yellow px-2 py-1 rounded text-sm'>
            ⭐ {movie.vote_average.toFixed(1)}
          </div>
        </div>
      )}
      <div className='p-4'>
        <h3 className='text-movie-duck font-mont font-bold text-lg mb-2 line-clamp-2'>
          {movie.title}
        </h3>
        <p className='text-movie-metal text-sm mb-2'>{movie.release_date}</p>
        <p className='text-movie-metal text-sm line-clamp-3'>
          {movie.overview}
        </p>
      </div>
    </div>
  );
}
