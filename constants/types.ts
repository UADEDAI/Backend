import { Movie } from 'src/schemas';

export type TimeAvailable = {
  startAt: string;
  endAt: string;
};

export type MoviesPaginated = {
  showingPagination: {
    page: number;
    limit: number;
    totalPages: number;
    totalResults: number;
  };
  comingSoonPagination?: {
    page: number;
    limit: number;
    totalPages: number;
    totalResults: number;
  };
  showing: Movie[];
  comingSoon?: Movie[];
};
