import React from 'react';
import { StartScore } from '../atoms';
import { nanoid } from 'nanoid';

interface MovieScoreProps {
  score: number;
}
export const MovieScore = ({ score }: MovieScoreProps) => {
  return (
    <div className='flex items-center text-movie-duck text-sm gap-2'>
      {Array.from({ length: 5 }).map((_, i) => (
        <StartScore
          key={nanoid()}
          type={score >= i + 1 ? 'full' : score >= i + 0.5 ? 'half' : 'empty'}
        />
      ))}
    </div>
  );
};
