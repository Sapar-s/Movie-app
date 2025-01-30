"use client";

import { fetchData } from "@/app/_components/Genre";
import { Button } from "@/components/ui/button";
import { ConImg } from "@/utils/constants";
import { Genre, MovieType } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { genreId: string } }) {
  const [selectGenres, setSelectGenres] = useState<{
    results: MovieType[];
    total_results: number;
  } | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  const [genres, setGenres] = useState<Genre[] | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const genreId = params.genreId;

      const getGenresUrl = `/discover/movie?language=en&with_genres=${genreId}&page=1`;
      const selectGenresData = await fetchData(getGenresUrl);
      setSelectGenres(selectGenresData);

      const genresData = await fetchData("/genre/movie/list?language=en");
      setGenres(genresData.genres);

      const selected = genresData.genres.find(
        (genre: Genre) => genre.id.toString() === genreId
      );
      setSelectedGenre(selected || null);
    };

    fetch();
  }, [params.genreId]);

  return (
    <div className="flex mt-[52px] justify-center">
      <div>
        <h2 className="text-[30px] leading-[36px] font-[600] text-[#09090B] text-foreground">
          Search Filter
        </h2>
        <div className="w-[387px] mt-8 border-r-[1px] border-border pr-10 h-[100vh] sticky top-[110px]">
          <h3 className="text-[24px] leading-[32px] font-[600] text-[#09090B] text-foreground">
            Genres
          </h3>
          <h4 className="text-[16px] leading-[24px] font-[400] text-[#09090B] text-foreground">
            See lists of movies by genre
          </h4>
          <div className="flex flex-wrap gap-4 mt-4">
            {genres?.map((genre) => (
              <Link key={genre.id} href={`/genres/${genre.id}`}>
                <Button
                  variant="outline"
                  className="py-[2px] pl-[10px] pr-1 h-[22px] rounded-full text-[12px] font-[600] leading-[16px]"
                >
                  {genre.name}
                  <img src="/rightArrow.svg" alt="" />
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="ml-10 mt-[64px]">
        <h4 className="flex gap-2 text-[20px] font-[600] leading-[28px]">
          {selectGenres?.total_results} titles in &#34;{selectedGenre?.name}
          &#34;
        </h4>
        <div className="max-w-[806px] w-full flex justify-center flex-wrap gap-[48px] mt-9">
          {selectGenres?.results?.map((movie) => (
            <Link href={`/movieInfo/${movie.id}`} key={movie.id}>
              <div className="rounded-lg overflow-hidden">
                <div>
                  <Image
                    src={ConImg + "w500/" + movie?.poster_path}
                    alt=""
                    className="h-[244px] w-[165px]"
                    width={165}
                    height={244}
                  />
                </div>
                <div className="p-2 flex flex-col items-start w-[165px] bg-secondary h-[87px]">
                  <h3 className="text-[14px] flex gap-1 mt-1 items-center">
                    <img src="/star.svg" alt="" />
                    {movie?.vote_average}
                    <span className="text-[12px] font-[400] leading-[16px] text-[#71717A]">
                      /10
                    </span>
                  </h3>
                  <h2 className="text-[16px]">{movie?.original_title}</h2>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
