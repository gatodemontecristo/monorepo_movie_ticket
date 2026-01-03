export interface ItembarProps {
  title: string;
  path: string;
}
export const menuItems: ItembarProps[] = [
  {
    title: 'Movies',
    path: '/movies',
  },
  {
    title: 'Tickets',
    path: '/movies/history',
  },
];
