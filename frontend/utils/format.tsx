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
const formatDate = (date: Date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = date.toLocaleDateString('en-US', { month: 'long' });
  const year = date.getFullYear();
  return `${day} ${month}, ${year}`;
};
export const getDays = () => {
  const today = new Date();
  const days = [];
  // Ayer
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  days.push({
    label: `${String(yesterday.getDate()).padStart(2, '0')} ${yesterday.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()}`,
    format: formatDate(yesterday),
    dayOfWeek: yesterday.toLocaleDateString('en-US', { weekday: 'long' }),
    date: yesterday,
    highlight: false,
    type: 'past',
  });
  days.push({
    label: `${String(today.getDate()).padStart(2, '0')} ${today.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()}`,
    format: formatDate(today),
    dayOfWeek: today.toLocaleDateString('en-US', { weekday: 'long' }),
    date: today,
    highlight: true,
    type: 'current',
  });
  for (let i = 1; i <= 3; i++) {
    const nextDay = new Date(today);
    nextDay.setDate(today.getDate() + i);
    days.push({
      label: `${String(nextDay.getDate()).padStart(2, '0')} ${nextDay.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()}`,
      format: formatDate(nextDay),
      dayOfWeek: nextDay.toLocaleDateString('en-US', { weekday: 'long' }),
      date: nextDay,
      highlight: false,
      type: 'future',
    });
  }
  return days;
};

export const isPastTime = (text: string) => {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  const currentMinutes = currentTime.getMinutes();

  const timeMatch = text.match(/(\d{1,2}):(\d{2})/);
  if (!timeMatch) return true;

  let hour = parseInt(timeMatch[1]);
  const minutes = parseInt(timeMatch[2]);
  if (hour <= 12) {
    if (text.toLowerCase().includes('pm') && hour !== 12) {
      hour += 12;
    } else if (text.toLowerCase().includes('am') && hour === 12) {
      hour = 0;
    }
  }

  const timeInMinutes = hour * 60 + minutes;
  const currentTimeInMinutes = currentHour * 60 + currentMinutes;

  return timeInMinutes < currentTimeInMinutes;
};
