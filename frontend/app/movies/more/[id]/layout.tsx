import React from 'react';
import { Metadata } from 'next';
import { MovieService } from '@/services/movie.service';

interface Props {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { id } = await params;
    const movieId = Number(id);

    // Llamada directa al servicio desde el servidor
    const data = await MovieService.getDetails(movieId);

    return {
      title: `Movie details for ${data?.title || 'Unknown Movie'}`,
      description: `Movie detail section for ${data?.title || 'Unknown Movie'}. This section provides detailed information about the movie, including its plot, cast, and more.`,
      openGraph: {
        title: data?.title || 'Movie Details',
        description: data?.overview || 'Movie details page',
        images: data?.backdrop_path
          ? [
              {
                url: `https://image.tmdb.org/t/p/w1280${data.backdrop_path}`,
                width: 1280,
                height: 720,
                alt: data.title,
              },
            ]
          : [],
      },
    };
  } catch {
    return {
      title: 'Movie Details',
      description:
        'Unknown movie details. Please check the ID or try again later.',
    };
  }
}

export default function MovieLayout({ children }: Props) {
  return <>{children}</>;
}
