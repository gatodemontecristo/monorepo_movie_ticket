import React from 'react';

interface SecondaryInfoProps {
  children?: React.ReactNode;
  className?: string;
  width: 'full' | 'half' | 'part' | 'tiny';
}
export const SecondaryInfo = ({
  children,
  className,
  width,
}: SecondaryInfoProps) => {
  const size = {
    full: 'w-full',
    half: 'w-1/2',
    part: 'w-1/3',
    tiny: 'w-1/4',
  };
  return (
    <div className={`flex flex-col gap-2 ${className} ${size[width]}`}>
      {children}
    </div>
  );
};
