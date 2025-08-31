import React from 'react';
import { Movie } from '@/types/tmdb';

import { useMovieGenres } from '@/hooks';
import { getGenresStringByIds } from '@/utils';
import { MovieDetails } from '../../types/tmdb';

interface MovieGenresProps {
  movie: Movie | MovieDetails;
}
export const MovieGenres = ({ movie }: MovieGenresProps) => {
  const { data, isLoading } = useMovieGenres();

  if (isLoading) {
    return <span>Loading genres...</span>;
  }
  const genresString = getGenresStringByIds(
    (movie as Movie).genre_ids ||
      (movie as MovieDetails).genres.map(genre => genre.id) ||
      [],
    ', ',
    data?.genres || [],
  );

  return (
    <div className='flex flex-col gap-2'>
      <div className='text-sm '>{genresString || 'Without genres'}</div>
    </div>
  );
};
