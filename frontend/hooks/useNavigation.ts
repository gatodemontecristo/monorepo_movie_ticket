'use client';

import { useRouter } from 'next/navigation';

export const useNavigation = () => {
  const router = useRouter();
  const goToHome = () => {
    router.push('/');
  };
  return {
    goToHome,
  };
};
