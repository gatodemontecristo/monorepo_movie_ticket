import React from 'react';
import { Movie } from '@/types/tmdb';

import { useMovieGenres } from '@/hooks';
import { getGenresStringByIds } from '@/utils';

interface MovieGenresProps {
  movie: Movie;
}
export const MovieGenres = ({ movie }: MovieGenresProps) => {
  const { data, isLoading } = useMovieGenres();

  if (isLoading) {
    return <span>Cargando géneros...</span>;
  }
  const genresString = getGenresStringByIds(
    movie.genre_ids || [],
    ', ',
    data?.genres || [],
  );

  return (
    <div className='flex flex-col gap-2'>
      <div className='text-sm '>{genresString || 'Sin géneros'}</div>
    </div>
  );
};
