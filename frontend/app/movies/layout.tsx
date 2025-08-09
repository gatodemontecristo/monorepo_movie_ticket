import { MenuBar } from '@/components';
import React from 'react';

export default function MoviesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className='min-h-screen bg-movie-black'>
      <MenuBar />
      {children}

      <div className='container mx-auto px-4 py-16'>
        <div className='text-center'>
          <h1 className='text-5xl font-bold text-movie-black mb-6 font-caros'>
            🎬 Movie Ticket Booking
          </h1>
          <p className='text-xl text-movie-grey mb-8 max-w-2xl mx-auto font-mont'>
            Welcome to your movie ticket booking application! Book your favorite
            movies with ease.
          </p>
          <div className='space-y-4'>
            <button className='bg-movie-yellow hover:bg-movie-duck text-movie-black font-bold py-3 px-8 rounded-lg transition duration-200 transform hover:scale-105 font-mont'>
              Browse Movies
            </button>
            <div className='flex justify-center space-x-4 mt-8'>
              <div className='bg-movie-white p-6 rounded-lg shadow-lg max-w-sm border border-movie-metal/20'>
                <h3 className='text-lg font-semibold mb-2 text-movie-black font-caros'>
                  🎭 Latest Movies
                </h3>
                <p className='text-movie-grey font-mont'>
                  Discover the newest releases in theaters
                </p>
              </div>
              <div className='bg-movie-white p-6 rounded-lg shadow-lg max-w-sm border border-movie-metal/20'>
                <h3 className='text-lg font-semibold mb-2 text-movie-black font-caros'>
                  🎟️ Easy Booking
                </h3>
                <p className='text-movie-grey font-mont'>
                  Book tickets in just a few clicks
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
