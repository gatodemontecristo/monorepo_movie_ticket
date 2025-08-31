import { Movie } from './tmdb';
export interface GenericLink {
  href: string;
  label: string;
}

export interface MovieTheather {
  row: string;
  lines: LineTheather[];
  other_lines: LineTheather[];
}

export interface LineTheather {
  number: number;
  state: 'available' | 'selected' | 'unavailable';
}
