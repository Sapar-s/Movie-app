"use client";

import { ConImg } from "@/utils/constants";
import { fetchData } from "./FetchData";
import { MovieType, SearchMovie } from "@/utils/types";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { TrailerDialog } from "./TrailerDialog";
import { Skeleton } from "@/components/ui/skeleton";

export const Hero = () => {
  const [heroMovies, setHeroMovies] = useState<SearchMovie | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    const getDatas = async () => {
      const heroMovies = await fetchData(
        "/movie/now_playing?language=en-US&page=1"
      );
      setHeroMovies(heroMovies);
    };
    getDatas();
    setIsLoading(false);
  }, []);

  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  return (
    <>
      <div className="  flex flex-wrap gap-6 justify-center mt-6 ">
        {isLoading ? (
          <Skeleton className="w-screen h-[600px] " />
        ) : (
          <Carousel
            plugins={[plugin.current]}
            className="w-full h-[600px]"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent>
              {heroMovies?.results

                .slice(0, 10)
                .map((movie: MovieType, index: number) => {
                  return (
                    <CarouselItem key={index} className="relative">
                      <Link href={`/movieInfo/${movie.id}`}>
                        <div
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
                            <div className="text-[16px] leading-[16px] text-[#fafafa] w-[310px] mt-[16px] ">
                              {movie?.overview}
                            </div>
                          </div>
                        </div>
                      </Link>
                      <TrailerDialog movieId={movie.id} />
                    </CarouselItem>
                  );
                })}
            </CarouselContent>
            <CarouselPrevious className="absolute left-[44px] " />
            <CarouselNext className="absolute right-[44px] " />
          </Carousel>
        )}
      </div>
    </>
  );
};
