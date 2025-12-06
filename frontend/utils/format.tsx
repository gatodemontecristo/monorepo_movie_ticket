import { InfoBoxProps } from '@/components';
import { MovieDetails } from '@/types';

export const formatScore = (score: number = 0): number => {
  return Number((Number((score || 0).toFixed(0)) / 2).toFixed(1));
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

export const getDays = () => {
  const today = new Date();
  const days = [];
  // Ayer
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  days.push({
    label: `${String(yesterday.getDate()).padStart(2, '0')} ${yesterday.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()}`,
    date: yesterday,
    highlight: false,
  });
  days.push({
    label: `${String(today.getDate()).padStart(2, '0')} ${today.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()}`,
    date: today,
    highlight: true,
  });
  for (let i = 1; i <= 3; i++) {
    const nextDay = new Date(today);
    nextDay.setDate(today.getDate() + i);
    days.push({
      label: `${String(nextDay.getDate()).padStart(2, '0')} ${nextDay.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()}`,
      date: nextDay,
      highlight: false,
    });
  }
  return days;
};
