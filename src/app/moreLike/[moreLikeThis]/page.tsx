"use client";

import { fetchData } from "@/app/_components/FetchData";
import { MoviePagination } from "@/app/_components/MoviePagination";
import { ConImg } from "@/utils/constants";
import { MovieType } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function MoreMovie(props: {
  params: Promise<{ moreLikeThis: string }>;
}) {
  const [moreMovies, setMoreMovies] = useState<any>(null);
  const searchParams = useSearchParams();
  const pages = searchParams.get("page");
  console.log({ moreMovies });

  useEffect(() => {
    const getDatas = async () => {
      const { moreLikeThis } = await props.params;
      const moreMovies = await fetchData(
        `/movie/${moreLikeThis}/similar?language=en-US&page=${
          pages ? pages : 1
        }`
      );
      setMoreMovies(moreMovies);
    };
    getDatas();
  }, [pages]);

  return (
    <div className="w-[100vw] flex flex-col items-center ">
      <div>
        <h2 className="text-[30px] leading-[36px] font-[600] mt-[52px] ">
          More Like This
        </h2>
        <div className="max-w-[1277px] w-full flex justify-center flex-wrap gap-[32px] mt-9 ">
          {moreMovies?.results?.map((movie: MovieType, index: number) => {
            return (
              <div key={index}>
                <Link href={`/movieInfo/${movie.id}`}>
                  <div className="rounded-[8px] overflow-hidden ">
                    <div>
                      <Image
                        src={ConImg + "w500/" + movie?.poster_path}
                        alt=""
                        className=" "
                        width={229.73}
                        height={340}
                      />
                    </div>
                    <div className="p-2 flex flex-col items-start w-[229.73px] bg-secondary  h-[95px]">
                      <h3 className="text-[14px] flex gap-1 mt-1 ">
                        <img src="/star.svg" alt="" />
                        {movie?.vote_average}{" "}
                        <span className="text-[12px] text-[#71717A]  font-[400] leading-[16px] ">
                          /10
                        </span>
                      </h3>
                      <h2 className="text-[18px] ">{movie?.original_title}</h2>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
          <div className="max-w-[1277px] w-full flex justify-end ">
            <MoviePagination
              totalPages={moreMovies?.total_pages}
              currentPage={moreMovies?.page}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
