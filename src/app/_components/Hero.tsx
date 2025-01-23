import { ConImg } from "@/utils/constants";
import { fetchData } from "./Genre";
import { MovieType } from "@/utils/types";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

export const Hero = async () => {
  const hero = "/movie/now_playing?language=en-US&page=1";

  const heroMovies = await fetchData(hero);

  return (
    <div>
      <div className="  flex flex-wrap gap-6 justify-center mt-6 ">
        <Carousel className="w-full h-[600px]">
          <CarouselContent>
            {heroMovies.results
              .slice(0, 10)
              .map((movie: MovieType, index: number) => {
                return (
                  <div key={index} className="">
                    <CarouselItem>
                      <div
                        // className="relative  "
                        className="w-[100vw] h-[600px] relative "
                        style={{
                          backgroundImage: `url(${
                            ConImg + "original" + movie?.backdrop_path
                          }) `,
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      >
                        <div className=" w-[100vw] h-[600px] bg-[#000]/20 absolute"></div>

                        <div className=" left-[140px] top-[178px] absolute ">
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

                          <Button
                            variant="outline"
                            className="py-2 px-4  rounded-md flex gap-2 h-10 mt-4  items-center "
                          >
                            <img src="/play.svg" alt="" />
                            Watch Trailer
                          </Button>
                        </div>
                      </div>
                    </CarouselItem>
                  </div>
                );
              })}
          </CarouselContent>
          <CarouselPrevious className="absolute left-[44px] " />
          <CarouselNext className="absolute right-[44px] " />
        </Carousel>
      </div>
    </div>
  );
};
