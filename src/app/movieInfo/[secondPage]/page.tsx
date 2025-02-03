import { fetchData } from "@/app/_components/FetchData";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ConImg } from "@/utils/constants";
import { Genre, MovieType } from "@/utils/types";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const SecondPage = async (props: {
  params: Promise<{ secondPage: string }>;
}) => {
  const { secondPage } = await props.params;

  const movieDetail = `/movie/${secondPage}?language=en-US`;
  const movie = await fetchData(movieDetail);

  const minut = movie.runtime % 60;
  const hour = Math.floor(movie.runtime / 60);

  const director = `/movie/${secondPage}/credits?language=en-US`;
  const directors = await fetchData(director);

  const writers = job();

  function job() {
    const workers = directors.crew.map(
      (worker: { name: string; job: string }, index: number) => {
        if (worker.job == "Writer") {
          return <div key={index}>{worker.name} </div>;
        }
      }
    );
    return workers;
  }
  // console.log("workers ==> ", writers);

  // console.log("directors => ", directors);

  const more = `/movie/${secondPage}/similar?language=en-US&page=1`;
  const moreMovies = await fetchData(more);

  const trailer = `/movie/${secondPage}/videos?language=en-US`;
  const comeTrailer = await fetchData(trailer);

  return (
    <div>
      <div className="max-w-[1080px] m-auto">
        <div className="flex justify-between mt-[52px]">
          <div>
            <h1 className="text-[36px] font-[700] leading-[40px] ">
              {movie.original_title}
            </h1>
            <h3 className="text-[18px] leading-[28px] font-[400] ">
              {movie.release_date} · {movie.adult ? "R" : "PG"} · {hour}h{" "}
              {minut}m
            </h3>
          </div>
          <div>
            <h5 className="text-[12px] font-[500] leading-[16px] ">Rating</h5>
            <div className="flex items-center">
              <img src="/star.svg" alt="" className="w-7 h-7 " />
              <div className="flex flex-col">
                <div className="text-[18px] font-[600] leading-[28px] ">
                  {movie.vote_average}{" "}
                  <span className="text-[16px] text-[#71717A] font-[400] ">
                    /10
                  </span>
                </div>
                <div className="text-[12px] text-[#71717A] ">
                  {movie.vote_count}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex mt-6 gap-8">
          <div className="">
            <Image
              src={ConImg + "w500/" + movie.poster_path}
              alt=""
              width={290}
              height={428}
              className="rounded-sm h-[428px]"
            />
          </div>
          <div className="relative ">
            <Image
              src={ConImg + "original/" + movie.backdrop_path}
              alt=""
              width={760}
              height={428}
              className=" h-[428px] rounded-sm"
            />
            <div className="bg-[#000]/40 absolute top-0 w-[759px] h-[428px] rounded-sm"></div>
            <Dialog>
              <div className="flex items-center gap-3 absolute bottom-6 left-6">
                <DialogTrigger asChild>
                  <button className="w-10 h-10 rounded-full flex items-center justify-center bg-[#fff]  ">
                    <Image src="/play.svg" alt="" width={16} height={16} />
                  </button>
                </DialogTrigger>
                <h4 className="text-[#fff] text-[16px] font-[400] leading-[24px] ">
                  Play Trailer
                </h4>
                <h4>{}</h4>
              </div>
              <DialogContent className=" border-none p-0 m-0 bg-none w-[997px] max-w-full">
                <iframe
                  src={`https://www.youtube.com/embed/${comeTrailer.results[0]?.key}`}
                  width={997}
                  height={561}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  title={comeTrailer.results[0]?.name}
                  allowFullScreen
                ></iframe>
                <DialogTitle className="hidden"></DialogTitle>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="flex gap-[10px] mt-8">
          {movie.genres.map((genre: Genre, index: number) => {
            return (
              <div
                key={index}
                className="py-[2px] px-[10px] border-[1px] border-[#E4E4E7] rounded-full border-border text-[12px] font-[600] leading-[16px] "
              >
                {genre?.name}
              </div>
            );
          })}
        </div>

        <p className="mt-5 text-[16px] font-[400] leading-[24px] ">
          {movie.overview}
        </p>
        <div className="flex gap-[53px] border-b border-border mt-5 pb-1">
          <h4 className="w-[64px] text-[16px] font-[700] leading-[28px] ">
            {" "}
            Director
          </h4>
          <h4 className="text-[16px] font-[400] leading-[24px] ">
            {" "}
            {directors.crew[1]?.name}
          </h4>
        </div>

        <div className="flex gap-[53px] border-b border-border mt-5 pb-1">
          <h4 className="w-[64px] text-[16px] font-[700] leading-[28px] ">
            {" "}
            Writers{" "}
          </h4>
          <div className=" flex gap-3 text-[16px] font-[400] leading-[24px] ">
            {writers}
          </div>
        </div>

        <div className="flex gap-[53px] border-b border-border mt-5 pb-1">
          <h4 className="w-[64px] text-[16px] font-[700] leading-[28px] ">
            {" "}
            Stars{" "}
          </h4>
          <h4 className="text-[16px] font-[400] leading-[24px]  ">
            {" "}
            {directors.cast[0]?.name} · {directors.cast[1]?.name} ·{" "}
            {directors.cast[2]?.name} · {directors.cast[3]?.name} ·{" "}
            {directors.cast[4]?.name}
          </h4>
        </div>

        <div>
          <div className="w-full flex justify-between mt-8 ">
            <h3 className="text-[24px] font-[600] leading-[32px] ">
              More like this
            </h3>
            <Link href={`/moreLike/${secondPage}`}>
              <button className="flex text-[14px] items-center gap-2">
                See more <ArrowRight className="w-4 h-4 " />
              </button>
            </Link>
          </div>
          <div className="mt-9 flex gap-8 ">
            {moreMovies.results
              .slice(1, 6)
              .map((movie: MovieType, index: number) => {
                return (
                  <div key={index}>
                    <Link href={`/movieInfo/${movie.id}`}>
                      <div className="rounded-[8px] overflow-hidden ">
                        <div>
                          <Image
                            src={ConImg + "w500/" + movie?.poster_path}
                            alt=""
                            className=" "
                            width={190}
                            height={281}
                          />
                        </div>
                        <div className="p-2 flex flex-col items-start w-[190px] bg-secondary  h-[87px]">
                          <h3 className="text-[14px] flex gap-1 mt-1 ">
                            <img src="/star.svg" alt="" />
                            {movie?.vote_average}/10
                          </h3>
                          <h2 className="text-[18px] ">
                            {movie?.original_title}
                          </h2>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondPage;
