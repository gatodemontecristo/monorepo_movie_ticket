export const SITE_NAME = 'CineScope';

export interface ButtonNavigation {
  name: string;
  href: string;
}
export const BUTTON_NAVIGATION: ButtonNavigation[] = [
  {
    name: 'Movies',
    href: '/movies',
  },
  {
    name: 'Tickets',
    href: '/movies/history',
  },
];
