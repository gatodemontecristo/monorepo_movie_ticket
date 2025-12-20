'use client';

import { useCurrentUser, useTicketsByUserId } from '@/hooks';
import { nanoid } from 'nanoid';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { TicketHistory } from '@/components/molecules/ticket';
import { ScreenContent } from '@/components/molecules/ScreenContent';

export default function HistoryPage() {
  const router = useRouter();

  const currentUser = useCurrentUser();
  useEffect(() => {
    if (!currentUser) {
      router.push(`/login?origin=history`);
    }
  }, [currentUser, router]);
  const {
    data: userTickets,
    isLoading,
    error,
  } = useTicketsByUserId(currentUser?.id || '');
  if (isLoading) {
    return (
      <div className='min-h-screen bg-movie-black p-8 mt-20 flex items-center justify-center'>
        <p className='text-movie-white font-mont text-xl'>Loading tickets...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen bg-movie-black p-8 mt-20 flex items-center justify-center'>
        <p className='text-movie-white font-mont text-xl'>
          Error loading tickets
        </p>
      </div>
    );
  }

  return (
    <ScreenContent isLoading={isLoading || !currentUser} outside>
      <div className='min-h-screen bg-movie-black p-8 mt-24 flex flex-col items-center gap-4'>
        <p className='w-full text-4xl font-mont font-medium text-movie-white mb-8 text-center'>
          My Ticket History
        </p>
        {userTickets && userTickets.length > 0 ? (
          <div className='flex flex-col w-full items-center gap-6'>
            {userTickets.map(ticket => (
              <TicketHistory ticket={ticket} key={nanoid()} />
            ))}
          </div>
        ) : (
          <div className='text-center py-12'>
            <p className='text-movie-white/70 font-mont text-lg'>
              No tickets found. Start booking your first movie!
            </p>
          </div>
        )}
      </div>
    </ScreenContent>
  );
}
