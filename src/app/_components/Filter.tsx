"use client";

import { Button } from "@/components/ui/button";
import { Genre } from "@/utils/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchData } from "./FetchData";
import { useSearchParams } from "next/navigation";

export const Filter = () => {
  const [genres, setGenres] = useState<any>(null);
  // const [selectGenres, setSelectGenres] = useState<any>(null);
  // const [selectedGenre, setSelectedGenre] = useState<any>(null);
  const searchParams = useSearchParams();
  const genreIds = searchParams.get("genreIds");

  useEffect(() => {
    const getDatas = async () => {
      const getGenres = `/discover/movie?language=en&with_genres=${genreIds}&page=1`;
      //   const selectGenres = await fetchData(getGenres);
      const { genres } = await fetchData("/genre/movie/list?language=en");
      //   const selectedGenre = genres.find(
      //     (genre: { id: string; name: string }) => genre.id == genreIds
      //   );
      setGenres(genres);
      //   setSelectGenres(selectGenres);
      //   setSelectedGenre(selectedGenre);
    };
    getDatas();
  }, []);
  return (
    <>
      <div className="w-[387px] mt-8 border-r-[1px] border-border pr-10 h-[100vh] sticky top-[110px] ">
        <h3 className="text-[24px] leading-[32px] font-[600] text-[#09090B] text-foreground ">
          Genres
        </h3>
        <h4 className="text-[16px] leading-[24px] font-[400] text-[#09090B] text-foreground ">
          See lists of movies by genre
        </h4>
        <div className="flex flex-wrap gap-4 mt-4 ">
          {genres?.map((genre: Genre, index: number) => {
            return (
              <Link key={index} href={`/genres/${genre.id}`}>
                <Button
                  key={index}
                  variant="outline"
                  className="py-[2px] pl-[10px] pr-1 h-[22px] rounded-full text-[12px] font-[600] leading-[16px] "
                >
                  {genre.name}
                  <img src="/rightArrow.svg" alt="" />
                </Button>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};
