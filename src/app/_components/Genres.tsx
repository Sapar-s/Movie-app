"use client";

import { useEffect, useState } from "react";
import { fetchData } from "./FetchData";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Genre } from "@/utils/types";
import { Badge } from "@/components/ui/badge";
import {
  //  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

export const Genres = () => {
  const [genres, setGenres] = useState<[] | null>(null);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const genreIds = searchParams.get("genreIds");

  useEffect(() => {
    const getDatas = async () => {
      const { genres } = await fetchData("/genre/movie/list?language=en");
      setGenres(genres);
    };
    getDatas();
  }, []);

  const handleClick = (genreId: number) => {
    router.push(`/genres?page=1&genreIds=${genreId}`);
  };

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="font-[500] leading-[20px] ">
            <img src="/chevronDown.svg" alt="" />
            Genre
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[577px] p-[20px] mr-[-480px] "
          onInteractOutside={() => setOpen(false)}
          onClick={() => setOpen(false)}
        >
          <h3 className="text-[24px] font-[600] leading-[32px] ">Genres</h3>
          <h4 className="text-[16px] font-[400] leading-[24px] mt-1 border-b-[1px] pb-4 border-border ">
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
        </PopoverContent>
      </Popover>
    </>
  );
};
