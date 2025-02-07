"use client";

import { fetchData } from "@/app/_components/FetchData";
import { ConImg } from "@/utils/constants";
import { Genre, MovieType, SearchMovie } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { MoviePagination } from "../_components/MoviePagination";

export default function SearchPage() {
  const [getSearched, setGetSearched] = useState<MovieType[] | null>(null);
  const [genres, setGenres] = useState<Genre[] | null>(null);
  const [fetchedMovies, setFetchedMovies] = useState<SearchMovie | null>(null);
  const searchParams = useSearchParams();
  const value = searchParams.get("value") || "";
  const genreIds = searchParams.get("genreIds") || "";
  const page = searchParams.get("page") || "1";
  const router = useRouter();

  useEffect(() => {
    const GetDatas = async () => {
      if (!value) return;

      const getSearchedData = await fetchData(
        `/search/movie?query=${value}&language=en-US&page=${page}`
      );

      setFetchedMovies(getSearchedData);
      let filteredMovies = getSearchedData.results || [];

      if (genreIds) {
        const genreIdsNumber = genreIds.split(",").map(Number);
        filteredMovies = filteredMovies.filter((movie: MovieType) =>
          genreIdsNumber.every((id) => movie.genre_ids.includes(id))
        );
      }

      setGetSearched(filteredMovies);
      const genreData = await fetchData("/genre/movie/list?language=en");

      setGenres(genreData.genres || []);
    };

    GetDatas();
  }, [value, genreIds, page]);

  const handleChange = (selectedGenres: string[]) => {
    const newGenreIds =
      selectedGenres.length > 0 ? selectedGenres.join(",") : null;
    const queryParams = new URLSearchParams();

    if (newGenreIds) queryParams.append("genreIds", newGenreIds);
    if (value) queryParams.append("value", value);
    queryParams.append("page", page);

    router.push(`/search?${queryParams.toString()}`);
  };
  return (
    <>
      <div className="flex gap-11 justify-center min-h-screen ">
        <div>
          <h2 className="text-[30px] leading-[36px] font-[600] mt-[52px] ">
            Search results
          </h2>
          <h4 className=" flex gap-2 text-[20px] font-[600] leading-[28px] mt-8 ">
            {getSearched?.length} results for &#34;{value}&#34;
          </h4>
          <div className="max-w-[806px] w-full flex justify-center flex-wrap gap-[48px]   mt-9 ">
            {getSearched?.map((movie: MovieType, index: number) => {
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
                totalPages={fetchedMovies?.total_pages || 10}
                currentPage={fetchedMovies?.page || 1}
              />
            </div>
          </div>
        </div>
        <div>
          <div
            className={`w-[387px] mt-8 border-l-[1px] border-border pl-10  h-[500px] sticky top-[110px] `}
          >
            <ToggleGroup
              type="multiple"
              className="flex flex-col items-start"
              onValueChange={handleChange}
              variant={"outline"}
              value={genreIds ? genreIds?.split(",") : []}
            >
              <h3 className="text-[24px] leading-[32px] font-[600] text-[#09090B] text-foreground ">
                Genres
              </h3>
              <h4 className="text-[16px] leading-[24px] font-[400] text-[#09090B] text-foreground ">
                See lists of movies by genre
              </h4>
              <div className="flex flex-wrap gap-4 mt-4 ">
                {genres?.map((genre: Genre, index: number) => {
                  return (
                    <ToggleGroupItem
                      key={index}
                      value={genre.id.toString()}
                      className="py-[2px] pl-[10px] pr-1 h-[22px] rounded-full cursor-pointer border-[1px] border-[#E4E4E7] data-[state=on]:bg-black data-[state=on]:text-white "
                    >
                      <h5 className="font-[600] text-[12px] leading-[16px] ">
                        {genre?.name}
                      </h5>
                      <img src="/rightArrow.svg" alt="" />
                    </ToggleGroupItem>
                  );
                })}
              </div>
            </ToggleGroup>
          </div>
        </div>
      </div>
    </>
  );
}
