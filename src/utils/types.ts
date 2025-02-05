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
  results: { key: string; name: string }[];
};

export type MoreMoviesType = {
  status_code: number;
  status_message: string;
  success: boolean;
};

export type VideoType = {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string;
  site: string;
  size: number;
  type: string;
};
