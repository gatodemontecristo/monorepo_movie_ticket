import React from 'react';

interface InfoRowProps {
  fistData?: string;
  secondData?: string;
  thirdData?: string;
  isHeader?: boolean;
}
export const InfoRow = ({
  fistData,
  secondData,
  thirdData,
  isHeader = false,
}: InfoRowProps) => {
  return (
    <div
      className={`text-movie-white flex flex-row justify-between w-full font-mont text-sm ${isHeader ? 'font-semibold' : ''}`}
    >
      <p>{fistData}</p>
      <p>{secondData}</p>
      <p>{thirdData}</p>
    </div>
  );
};
