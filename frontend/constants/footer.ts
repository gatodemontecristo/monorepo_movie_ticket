import { GenericLink } from '@/types';

export const UI_UX_INSPIRATION: GenericLink[] = [
  {
    href: 'https://www.behance.net/gallery/187266511/Cinema-Ticket-Booking-Website-UIUX-Design',
    label: 'Behance',
  },
  {
    href: 'https://www.figma.com/community/file/1254460263614941968/movie-ticket-booking-ui',
    label: 'Figma',
  },
];
interface LinkSection {
  title: string;
  links: GenericLink[];
}
export const UI_UX_INSPIRATION_SECTION: LinkSection = {
  title: 'UI/UX Inspiration',
  links: UI_UX_INSPIRATION,
};

export const FRONTEND_RESOURCES: GenericLink[] = [
  {
    href: 'https://es.react.dev/',
    label: 'React',
  },
  {
    href: 'https://nextjs.org/',
    label: 'Next.js',
  },
  {
    href: 'https://tailwindcss.com/',
    label: 'Tailwind CSS',
  },
  {
    href: 'https://tanstack.com/',
    label: 'TanStack',
  },
];

export const FRONTEND_RESOURCES_SECTION: LinkSection = {
  title: 'Frontend Resources',
  links: FRONTEND_RESOURCES,
};

export const BACKEND_RESOURCES: GenericLink[] = [
  {
    href: 'https://nodejs.org/en/',
    label: 'Node.js',
  },
  {
    href: 'https://expressjs.com/',
    label: 'Express.js',
  },
];

export const BACKEND_RESOURCES_SECTION: LinkSection = {
  title: 'Backend Resources',
  links: BACKEND_RESOURCES,
};

export const ANOTHER_RESOURCES: GenericLink[] = [
  {
    href: 'https://developer.themoviedb.org/docs/getting-started',
    label: 'The Movie Database',
  },
  {
    href: 'https://trello.com/b/tLzZEjOL',
    label: 'Trello',
  },
  {
    href: 'https://react-icons.github.io/react-icons/',
    label: 'React Icons',
  },
];

export const ANOTHER_RESOURCES_SECTION: LinkSection = {
  title: 'Another Resources',
  links: ANOTHER_RESOURCES,
};

export const COMPLETE_RESOURCES_SECTION: LinkSection[] = [
  UI_UX_INSPIRATION_SECTION,
  FRONTEND_RESOURCES_SECTION,
  BACKEND_RESOURCES_SECTION,
  ANOTHER_RESOURCES_SECTION,
];
