"use client";

import { Button } from "@/components/ui/button";
import { Genre } from "@/utils/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchData } from "./FetchData";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export const Filter = ({ border, pad }: { border: string; pad: string }) => {
  const [genres, setGenres] = useState<[] | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const genreIds = searchParams.get("genreIds");
  console.log(genreIds);

  useEffect(() => {
    const getDatas = async () => {
      const { genres } = await fetchData("/genre/movie/list?language=en");

      setGenres(genres);
    };
    getDatas();
  }, []);

  const handleClick = (genreId: number) => {
    const params = new URLSearchParams();
    params.set("genreIds", `${genreIds}, ${genreId.toString()}`);
    params.set("page", "1");
    router.push(`?${params.toString()}`);
    // router.push(`/genres?page=1&genreIds=${genreId}`);
  };
  return (
    <>
      <div
        className={`w-[387px] mt-8 ${border} border-border ${pad}  h-[500px] sticky top-[110px] `}
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
              <Badge
                key={index}
                onClick={() => handleClick(genre.id)}
                variant={genre.id == Number(genreIds) ? "default" : "outline"}
                className="py-[2px] pl-[10px] pr-1 h-[22px] rounded-full cursor-pointer "
              >
                {genre?.name}
                <img src="/rightArrow.svg" alt="" />
              </Badge>
            );
          })}
        </div>
      </div>
    </>
  );
};
