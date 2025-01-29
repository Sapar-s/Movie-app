"use client";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { fetchData } from "./Genre";
import Image from "next/image";
import { ConImg } from "@/utils/constants";
import { MovieType } from "@/utils/types";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Search() {
  const [searchValue, setSearchValue] = useState("");
  const [searched, setSearched] = useState([]);

  const searchHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value.toLowerCase();
    setSearchValue(search);

    // const filtered = movies.filter((movie) => {
    //   if (!search) {
    //     setSearched([]);
    //     return;
    //   }
    //   return movie.includes(search);
    // });
    // setSearched(filtered);

    const searchData = await fetchData(
      `/search/movie?query=${e.target.value}&language=en-US&page=1`
    );
    console.log({ searchData });
    setSearched(searchData.results);

    //   console.log({ searched });
  };
  return (
    <div className="flex flex-col relative">
      <div className="flex items-center ml-5">
        <img src="/magnifying-glass.svg" alt="" className="w-4 h-4 -mr-6" />
        <Input
          type="text"
          className="pl-8 w-[379px] "
          placeholder="Search..."
          onChange={searchHandler}
          value={searchValue}
        />
      </div>
      {searched.length > 0 && (
        <div className="w-[577px] p-2 border-border border-[1px] rounded-lg bg-background absolute top-12 ">
          {searched.slice(0, 5).map((movie: MovieType, index: number) => (
            <div
              key={index}
              className="w-[553px] p-2 pb-4 border-b-border border-b-[1px] flex gap-4 hover:rounded-lg hover:bg-[#f5f5f5] cursor-pointer "
            >
              <div>
                <Image
                  src={ConImg + "/w300" + movie?.poster_path}
                  alt=""
                  width={67}
                  height={100}
                  className="rounded-md "
                />
              </div>
              <div>
                <h4 className="text-[20px] font-[600] leading-[28px] ">
                  {movie?.original_title}
                </h4>
                <small className="text-[14px] flex gap-1 mt-1 ">
                  <img src="/star.svg" alt="" />
                  <h5 className="flex items-center">
                    {movie?.vote_average}
                    <span className="text-[12px] font-[400] leading-[16px] text-[#71717A] ">
                      /10
                    </span>
                  </h5>
                </small>
                <div className="flex justify-between w-[454px]  ">
                  <small>{movie?.release_date.slice(0, 4)}</small>
                  <div>
                    <Link href="/seeMore/upcoming">
                      <button className="flex text-[14px] items-center gap-2 ">
                        See more <ArrowRight className="w-4 h-4 " />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="h-[40px] py-2 px-4 flex items-end ">
            <button className="text-[14px] leading-[20px] font-[500] ">
              See all results for &#34;{searchValue}&#34;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
