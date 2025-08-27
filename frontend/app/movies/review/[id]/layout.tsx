import React from 'react';
import { Metadata } from 'next';
import { MovieService } from '@/services/movie.service';
import { buildImageUrl, IMAGE_SIZES } from '@/config/tmdb';

interface Props {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { id } = await params;
    const movieId = Number(id);

    const data = await MovieService.getDetails(movieId);

    return {
      title: `Movie reviews for ${data?.title || 'Unknown Movie'}`,
      description: `Movie reviews section for ${data?.title || 'Unknown Movie'}. This section provides detailed information and reviews about the movie.`,
      openGraph: {
        title: data?.title || 'Movie Reviews',
        description: data?.overview || 'Movie reviews page',
        images: data?.backdrop_path
          ? [
              {
                url: buildImageUrl(
                  data.backdrop_path,
                  IMAGE_SIZES.POSTER.MEDIUM,
                ) as string,
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
      title: 'Movie Reviews',
      description:
        'Unknown movie reviews. Please check the ID or try again later.',
    };
  }
}

export default function ReviewLayout({ children }: Props) {
  return <>{children}</>;
}
