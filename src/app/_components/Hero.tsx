import { ConImg } from "@/utils/constants";
import { fetchData } from "./Genre";
import { MovieType } from "@/utils/types";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
// import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export const Hero = async () => {
  const hero = "/movie/now_playing?language=en-US&page=1";
  const heroMovies = await fetchData(hero);

  const trailer = `/movie/${heroMovies.results.map(
    (movie: MovieType) => movie.id
  )}/videos?language=en-US`;
  const comeTrailer = await fetchData(trailer);
  // const plugin = React.useRef(
  //   Autoplay({ delay: 2000, stopOnInteraction: true })
  // );

  return (
    <>
      <div className="  flex flex-wrap gap-6 justify-center mt-6 ">
        <Carousel
          // plugins={[plugin.current]}
          className="w-full h-[600px]"
          // onMouseEnter={plugin.current.stop}
          // onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {heroMovies.results

              .slice(0, 10)
              .map((movie: MovieType, index: number) => {
                return (
                  <CarouselItem key={index}>
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
                          <div className="text-[12px] leading-[16px] text-[#fafafa] w-[302px] mt-[16px] ">
                            {movie?.overview}
                          </div>
                          <Dialog>
                            <DialogTrigger>
                              <Button
                                variant="outline"
                                className="py-2 px-4  rounded-md flex gap-2 h-10 mt-4 bg-secondary  items-center "
                              >
                                <Image
                                  src="/play.svg"
                                  alt=""
                                  height={16}
                                  width={16}
                                />
                                Watch Trailer
                              </Button>
                            </DialogTrigger>
                            <DialogContent className=" border-none p-0 m-0 bg-none left-[35.8%]">
                              <iframe
                                src={`https://www.youtube.com/embed/${comeTrailer.results[0].key}`}
                                width={997}
                                height={561}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                title={comeTrailer.results[0].name}
                                allowFullScreen
                              ></iframe>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </Link>
                  </CarouselItem>
                );
              })}
          </CarouselContent>
          <CarouselPrevious className="absolute left-[44px] " />
          <CarouselNext className="absolute right-[44px] " />
        </Carousel>
      </div>
    </>
  );
};
