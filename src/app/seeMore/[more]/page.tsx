import { fetchData } from "@/app/_components/FetchData";
import { MoviePagination } from "@/app/_components/MoviePagination";
import { ConImg } from "@/utils/constants";
import { MovieType } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";

export default async function MoreMovie(props: {
  params: Promise<{ more: string }>;
}) {
  const { more } = await props.params;
  const title = () => {
    if (more === "popular") {
      return "Popular";
    } else if (more === "upcoming") {
      return "Upcoming";
    } else if (more === "top_rated") {
      return "Top Rated";
    }
  };

  // const pages = () => {
  //   return "1";
  // };
  const getMovies = `/movie/${more}?language=en-US&page=1`;
  const moreMovies = await fetchData(getMovies);
  // console.log(moreMovies);

  return (
    <div className="w-[100vw] flex justify-center ">
      <div>
        <h2 className="text-[30px] leading-[36px] font-[600] mt-[52px] ">
          {title()}
        </h2>
        <div className="max-w-[1277px] w-full flex flex-wrap gap-[31px] justify-center mt-9 ">
          {moreMovies.results.map((movie: MovieType, index: number) => {
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
                  </div>
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
          <div className="max-w-[1277px] w-full flex justify-end ">
            <MoviePagination
              totalPages={moreMovies.total_pages}
              currentPage={moreMovies.page}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
