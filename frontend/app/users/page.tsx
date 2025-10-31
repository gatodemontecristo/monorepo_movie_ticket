'use client';
import React from 'react';
import { useUsers, useDeleteUser } from '@/hooks/useUser';
import { useAuth } from '@/hooks/useUser';
import { useRouter } from 'next/navigation';

export default function UsersPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { data: users, isLoading, error } = useUsers();
  const deleteUserMutation = useDeleteUser();

  // Redirigir si no está autenticado
  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const handleDeleteUser = async () => {
    // if (confirm('Are you sure you want to delete this user?')) {
    //   try {
    //     await deleteUserMutation.mutateAsync(userId);
    //   } catch (error) {
    //     // Error manejado por TanStack Query
    //   }
    // }
  };

  if (!isAuthenticated) {
    return (
      <div className='min-h-screen bg-movie-black flex items-center justify-center'>
        <div className='text-movie-white'>Redirecting to login...</div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className='min-h-screen bg-movie-black flex items-center justify-center'>
        <div className='text-movie-white'>Loading users...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen bg-movie-black flex items-center justify-center'>
        <div className='text-red-400'>Error loading users: {error.message}</div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-movie-black p-8'>
      <div className='max-w-6xl mx-auto'>
        <h1 className='text-4xl font-mont font-bold text-movie-white mb-8'>
          Users Management
        </h1>

        <div className='bg-movie-black/90 backdrop-blur-sm rounded-xl border border-movie-duck/20 overflow-hidden'>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead className='bg-movie-duck/10'>
                <tr>
                  <th className='px-6 py-4 text-left text-sm font-mont font-semibold text-movie-white'>
                    ID
                  </th>
                  <th className='px-6 py-4 text-left text-sm font-mont font-semibold text-movie-white'>
                    Email
                  </th>
                  <th className='px-6 py-4 text-left text-sm font-mont font-semibold text-movie-white'>
                    Created At
                  </th>
                  <th className='px-6 py-4 text-left text-sm font-mont font-semibold text-movie-white'>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-movie-duck/10'>
                {users?.map(user => (
                  <tr
                    key={user.id}
                    className='hover:bg-movie-duck/5 transition-colors'
                  >
                    <td className='px-6 py-4 text-sm font-mont text-movie-white/80'>
                      {user.id.slice(0, 8)}...
                    </td>
                    <td className='px-6 py-4 text-sm font-mont text-movie-white'>
                      {user.email}
                    </td>
                    <td className='px-6 py-4 text-sm font-mont text-movie-white/80'>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className='px-6 py-4 text-sm'>
                      <button
                        onClick={() => handleDeleteUser()}
                        disabled={deleteUserMutation.isPending}
                        className='text-red-400 hover:text-red-300 font-mont font-medium disabled:opacity-50 disabled:cursor-not-allowed'
                      >
                        {deleteUserMutation.isPending
                          ? 'Deleting...'
                          : 'Delete'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {users?.length === 0 && (
            <div className='text-center py-12'>
              <p className='text-movie-white/60 font-mont'>No users found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
