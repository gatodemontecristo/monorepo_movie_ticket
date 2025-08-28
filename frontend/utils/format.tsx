import { InfoBoxProps } from '@/components';
import { MovieDetails } from '@/types';

export const formatScore = (score: number): number => {
  return Number((Number(score.toFixed(0)) / 2).toFixed(1));
};
export const reviewFeature = (movie: MovieDetails): InfoBoxProps[] => [
  {
    color: 'bg-green-500',
    number: movie.popularity,
    text: 'Popularity',
  },
  {
    color: 'bg-amber-500',
    number: movie.vote_count,
    text: 'Vote Count',
  },
  {
    color: 'bg-blue-500',
    number: movie.vote_average,
    text: 'Vote Average',
  },
  {
    color: 'bg-red-500',
    number: movie.budget,
    text: 'Budget',
  },
];
