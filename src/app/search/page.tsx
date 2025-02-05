"use client";

import { fetchData } from "@/app/_components/FetchData";
import { ConImg } from "@/utils/constants";
import { MovieType, SearchMovie } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SearchFilter } from "../_components/SearchFilter";
// import { MoviePagination } from "../_components/MoviePagination";

export default function Search() {
  const searchParams = useSearchParams();
  const value = searchParams.get("value");

  const [getSearched, setGetSearched] = useState<SearchMovie | null>(null);

  useEffect(() => {
    const GetDatas = async () => {
      const getSearched = await fetchData(
        `/search/movie?query=${value}&language=en-US&page=1`
      );
      setGetSearched(getSearched);
    };
    GetDatas();
  }, []);

  return (
    <>
      <div className="flex gap-11 justify-center">
        <div>
          <h2 className="text-[30px] leading-[36px] font-[600] mt-[52px] ">
            Search results
          </h2>
          <h4 className=" flex gap-2 text-[20px] font-[600] leading-[28px] mt-8 ">
            {getSearched?.total_results} results for &#34;{value}&#34;
          </h4>
          <div className="max-w-[806px] w-full flex justify-center flex-wrap gap-[48px]   mt-9 ">
            {getSearched?.results?.map((movie: MovieType, index: number) => {
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
            {/* <Pagination className="w-[100vw] flex justify-end mt-8">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination> */}

            <div className="max-w-[1277px] w-full flex justify-end ">
              {/* <MoviePagination
                          totalPages={selectGenres?.total_pages || 10}
                          currentPage={selectGenres?.page || 1}
                        /> */}
            </div>
          </div>
        </div>
        <div>
          <SearchFilter />
        </div>
      </div>
    </>
  );
}
