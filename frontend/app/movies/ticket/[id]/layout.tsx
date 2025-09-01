import { MovieService } from '@/services';
import { Metadata } from 'next';
import { buildImageUrl, IMAGE_SIZES } from '@/config/tmdb';
import React from 'react';

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
      title: `Movie tickets for ${data?.title || 'Unknown Movie'}`,
      description: `Movie tickets section for ${data?.title || 'Unknown Movie'}. This section allows you to book tickets and find showtimes.`,
      openGraph: {
        title: data?.title || 'Movie Tickets',
        description: data?.overview || 'Movie tickets page',
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
      title: 'Movie Tickets',
      description:
        'Unknown movie tickets. Please check the ID or try again later.',
    };
  }
}

export default function TicketLayout({ children }: Props) {
  return <>{children}</>;
}
