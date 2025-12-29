interface GeneralSeatCategoryProps {
  state: SEAT_STATES;
  label: string;
  disable: boolean;
}
export const DEFAULT_SEAT_SIZE: SEAT_SIZES = 'large';
export const GENERAL_SEAT_CATEGORIES: GeneralSeatCategoryProps[] = [
  {
    state: 'available',
    label: 'Available',
    disable: true,
  },
  {
    state: 'selected',
    label: 'Selected',
    disable: true,
  },
  {
    state: 'unavailable',
    label: 'Unavailable',
    disable: false,
  },
];
export type SEAT_SIZES = 'small' | 'medium' | 'large';
export type SEAT_STATES = 'available' | 'selected' | 'unavailable';
export const SEAT_PRICE = 20.99;
export const LIMIT_SEATS = 5;
