import { ConImg } from "@/utils/constants";
import { MovieType } from "@/utils/types";
import { fetchData } from "./FetchData";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const TopRated = async () => {
  const topRated = "/movie/top_rated?language=en-US&page=1";

  const topRatedMovies = await fetchData(topRated);

  return (
    <div className=" max-w-[1277px] w-full m-auto mt-[52px]">
      <div className="flex justify-between w-full ">
        <h2 className="text-[24px] text-[#09090B] font-[600] leading-8 ">
          Top Rated
        </h2>
        <Link href="/seeMore/top_rated">
          <button className="flex text-[14px] items-center gap-2 hover:underline ">
            See more <ArrowRight className="w-4 h-4 " />
          </button>{" "}
        </Link>
      </div>

      <div className="  flex flex-wrap gap-[31px] justify-center mt-9 ">
        {topRatedMovies.results
          .slice(0, 10)
          .map((movie: MovieType, index: number) => {
            return (
              <Link href={`/movieInfo/${movie.id}`} key={index}>
                <div className="rounded-lg overflow-hidden">
                  <div>
                    <Image
                      src={ConImg + "w500/" + movie?.poster_path}
                      alt=""
                      className="h-[340px] w-[230px] "
                      width={500}
                      height={500}
                    />
                  </div>{" "}
                  <div className="p-2 flex flex-col items-start w-[230px] bg-secondary h-[95px]">
                    <h3 className="text-[14px] flex gap-1 mt-1 ">
                      <img src="/star.svg" alt="" />
                      {movie?.vote_average}/10
                    </h3>
                    <h2 className="text-[18px] ">{movie?.original_title}</h2>
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
};
