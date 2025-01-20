"use client";

import { useEffect, useState } from "react";

type MovieType = {
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

export const HomePage = () => {
  const [movie, setMovie] = useState<MovieType | undefined>();
  //fetch movie medeelel
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOTcwYjUwZjdhMzg2NGQ5MTRjNGVjMzE5YWNiMzQ1ZCIsIm5iZiI6MTczNzM0MjA4Ni40NDksInN1YiI6IjY3OGRiYzg2OWQ1ZTM2M2QxOTY0ZTQ4NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0ACMwmn6NE8iDWJVAS6_N4vGHAsywaH_2whV41AWnaw";

  const getMovie = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",

      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (data?.results) {
      setMovie(data.results[0]);
    }
  };

  useEffect(() => {
    getMovie();
  }, []);
  console.log({ movie });
  return (
    <>
      <div className="rounded-lg overflow-hidden ">
        <div>
          <img
            className="h-[340px] w-[230px] "
            src={"https://image.tmdb.org/t/p/w500/" + movie?.poster_path}
            alt=""
          />
        </div>{" "}
        <div className="p-2 flex flex-col items-start w-[230px] bg-[#F4F4F5] ">
          <h3 className="text-[14px] flex gap-1 mt-1 ">
            <img src="/star.svg" alt="" /> {movie?.vote_average}/10
          </h3>
          <h2 className="text-[18px] ">{movie?.original_title}</h2>
        </div>
      </div>
    </>
  );
};
