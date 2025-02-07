"use client";

import { fetchData } from "@/app/_components/FetchData";
import { ConImg } from "@/utils/constants";
import { Genre, MovieType, SearchMovie } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Filter } from "../_components/Filter";
import { MoviePagination } from "../_components/MoviePagination";

export default function GenresPage() {
  const [selectGenres, setSelectGenres] = useState<SearchMovie | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  const searchParams = useSearchParams();
  const genreIds = searchParams.get("genreIds");
  const pages = searchParams.get("page");

  useEffect(() => {
    const getDatas = async () => {
      const getGenres = `/discover/movie?language=en&with_genres=${genreIds}&page=${
        pages ? pages : 1
      }`;
      const selectGenres = await fetchData(getGenres);
      const { genres } = await fetchData("/genre/movie/list?language=en");
      const selectedGenre = genres.find(
        (genre: { id: string; name: string }) => genre.id == genreIds
      );

      setSelectGenres(selectGenres);
      setSelectedGenre(selectedGenre);
    };
    getDatas();
  }, [genreIds, pages]);

  return (
    <div className="flex mt-[52px] justify-center">
      <div>
        <h2 className="text-[30px] leading-[36px] font-[600] text-[#09090B] text-foreground ">
          Search Filter
        </h2>
        <Filter />
      </div>
      <div className="ml-10 mt-[64px]">
        <h4 className=" flex gap-2 text-[20px] font-[600] leading-[28px] ">
          {selectGenres?.total_results} titles in &#34;{selectedGenre?.name}
          &#34;
        </h4>
        <div className="max-w-[806px] w-full flex justify-center flex-wrap gap-[48px]   mt-9 ">
          {selectGenres?.results.map((movie: MovieType, index: number) => {
            return (
              <Link href={`/movieInfo/${movie.id}`} key={index}>
                <div className="rounded-lg overflow-hidden">
                  <div>
                    <Image
                      src={ConImg + "w500/" + movie?.poster_path}
                      alt=""
                      className="h-[244px] w-[165px] "
                      width={165}
                      height={244}
                    />
                  </div>
                  <div className="p-2 flex flex-col items-start w-[165px] bg-secondary h-[87px]">
                    <h3 className="text-[14px] flex gap-1 mt-1 items-center">
                      <img src="/star.svg" alt="" />
                      {movie?.vote_average}
                      <span className="text-[12px] font-[400] leading-[16px] text-[#71717A] ">
                        /10
                      </span>
                    </h3>
                    <h2 className="text-[16px] ">{movie?.original_title}</h2>
                  </div>
                </div>
              </Link>
            );
          })}
          <div className="max-w-[1277px] w-full flex justify-end ">
            <MoviePagination
              totalPages={selectGenres?.total_pages || 10}
              currentPage={selectGenres?.page || 1}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
