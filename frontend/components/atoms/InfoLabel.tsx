import React from 'react';

interface InfoLabelProps {
  text: string;
  subtext?: string;
}

export const InfoLabel = ({ text, subtext }: InfoLabelProps) => {
  return (
    <div>
      {text}
      {subtext && <div>{subtext}</div>}
    </div>
  );
};
