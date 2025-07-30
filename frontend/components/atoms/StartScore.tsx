import React from 'react';
interface StartScoreProps {
  type: 'full' | 'half' | 'empty';
}
import { FaRegStar, FaRegStarHalfStroke, FaStar } from 'react-icons/fa6';
export const StartScore = ({ type }: StartScoreProps) => {
  switch (type) {
    case 'full':
      return <FaStar />;
    case 'half':
      return <FaRegStarHalfStroke />;
    default:
      return <FaRegStar />;
  }
};
