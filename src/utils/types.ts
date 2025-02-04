export type MovieType = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: [];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type Genre = {
  id: number;
  name: string;
};

export type SearchMovie = {
  page: number;
  results: [];
  total_pages: number;
  total_results: number;
};

export type TrailerType = {
  id: number;
  results: [];
};

export type MoreMoviesType = {
  status_code: number;
  status_message: string;
  success: boolean;
};
