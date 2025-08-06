import { Genre } from '@/types';

export const getGenresStringByIds = (
  genreIds: number[],
  separator: string = ', ',
  genres: Genre[],
): string => {
  if (!genreIds || genreIds.length === 0) return '';
  if (!genres || genres.length === 0) return 'Géneros no disponibles';
  const genreMap = genreIds.map(id => {
    const genre = genres.find(g => g.id === id);
    return genre ? genre.name : 'Desconocido';
  });
  if (genreMap.length === 0) return 'Sin géneros';

  return genreMap.join(separator);
};
