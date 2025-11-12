import React from 'react';

interface BackgroundGradientProps {
  shadowSize?: 'sm' | 'md' | 'lg' | 'full';
  color?: string;
}
export const BackgroundGradient = ({
  shadowSize = 'lg',
  color = '#0a061e',
}: BackgroundGradientProps) => {
  const getShadowSize = (size: string) => {
    switch (size) {
      case 'sm':
        return '20%';
      case 'md':
        return '50%';
      case 'lg':
        return '75%';
      default:
        return '100%';
    }
  };
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: getShadowSize(shadowSize),
        background: `linear-gradient(to top, ${color}, transparent)`,
        padding: '1rem',
        zIndex: 5,
      }}
    ></div>
  );
};
