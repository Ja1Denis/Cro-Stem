
import React from 'react';

export enum StemMode {
  AGGRESSIVE = 'aggressive',
  CONSERVATIVE = 'conservative'
}

export interface ComparisonData {
  metric: string;
  crostem: string;
  snowball: string;
  chatgpt: string;
}

export interface UseCase {
  // Fix: Use React.ReactNode instead of JSX.Element to resolve 'Cannot find namespace JSX' error in .ts files
  icon: React.ReactNode;
  title: string;
  description: string;
}
