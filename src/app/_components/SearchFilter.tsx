"use client";

import { Genre } from "@/utils/types";
import { useEffect, useState } from "react";
import { fetchData } from "./FetchData";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export const SearchFilter = () => {
  const [genres, setGenres] = useState<[] | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const genreIds = searchParams.get("genreIds");
  const value = searchParams.get("value");
  // console.log(genreIds);

  useEffect(() => {
    const getDatas = async () => {
      const { genres } = await fetchData("/genre/movie/list?language=en");

      setGenres(genres);
    };
    getDatas();
  }, []);

  const handleChange = (values: string[]) => {
    // console.log(values);
    router.push(`/search?page=1&genreIds=${values}&value=${value}`);
  };

  return (
    <>
      <div
        className={`w-[387px] mt-8 border-l-[1px] border-border pl-10  h-[500px] sticky top-[110px] `}
      >
        <ToggleGroup
          type="multiple"
          className="flex flex-col items-start"
          onValueChange={handleChange}
          variant={"outline"}
          value={genreIds?.split(",")}
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
    </>
  );
};
