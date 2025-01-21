import { ConImg } from "@/utils/constants";
import { fetchData } from "./Genre";
import { MovieType } from "@/utils/types";
import Image from "next/image";

export const Hero = async () => {
  const hero = "/movie/now_playing?language=en-US&page=1";

  const heroMovies = await fetchData(hero);

  return (
    <div className="bg-[url()]  ">
      <div className="  flex flex-wrap gap-6 justify-center  ">
        {heroMovies.results
          .slice(0, 10)
          .map((movie: MovieType, index: number) => {
            return (
              <div key={index} className="">
                <div
                  className="relative"
                  // className={`bg-[url(${
                  //   ConImg + movie?.backdrop_path
                  // })] h-[600px] w-full `}
                >
                  <Image
                    src={ConImg + movie?.backdrop_path}
                    className="h-[600px] w-[100%] bg-custom-gradient bg-cover bg-center bg-no-repeat "
                    alt=""
                    width={500}
                    height={600}
                  />

                  <div className="absolute left-[140px] top-[178px]">
                    <h3 className="text-4 text-white font-[400] leading-[24px] ">
                      Now Playing:
                    </h3>
                    <h1 className="text-[36px] text-[#fff] font-[700] leading-[40px] ">
                      {movie?.original_title}
                    </h1>
                    <div className="flex">
                      <img src="/star.svg" alt="" />
                      <h3 className="text-[18px] font-[600] leading-[28px] text-[#fafafa] ">
                        {movie?.vote_average}
                        <span className="text-[#71717A] font-[400] text-[16px] leading-[24px] ">
                          /10
                        </span>
                      </h3>
                    </div>
                    <div className="text-[12px] leading-[16px] text-[#fafafa] w-[302px] mt-[16px] ">
                      {movie?.overview}
                    </div>
                    <button className="py-2 px-4 bg-[#f4f4f5] rounded-md flex gap-2 h-10 mt-4  items-center ">
                      <img src="/play.svg" alt="" />
                      Watch Trailer
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
