import { fetchData } from "@/app/_components/Genre";
import { Button } from "@/components/ui/button";
import { ConImg } from "@/utils/constants";
import { Genre, MovieType } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";

export default async function (props: {
  params: Promise<{ genreIds: string }>;
}) {
  const { genreIds } = await props.params;

  const getGenres = `/discover/movie?language=en&with_genres=${genreIds}&page=1`;
  const selectGenres = await fetchData(getGenres);

  const genres = "/genre/movie/list?language=en";
  const results = await fetchData(genres);

  return (
    <div className="flex ">
      <div>
        <h2 className="text-[30px] leading-[36px] font-[600] text-[#09090B] text-foreground ">
          Search Filter
        </h2>
        <div className="w-[387px] mt-8 ">
          <h3 className="text-[24px] leading-[32px] font-[600] text-[#09090B] text-foreground ">
            Genres
          </h3>
          <h4 className="text-[16px] leading-[24px] font-[400] text-[#09090B] text-foreground ">
            See lists of movies by genre
          </h4>
          <div className="flex flex-wrap gap-4 mt-4 ">
            {results.genres.map((genre: Genre, index: number) => {
              return (
                <Link key={index} href={`/genres/${genre.id}`}>
                  <Button
                    key={index}
                    variant="outline"
                    className="py-[2px] pl-[10px] pr-1 h-[22px] rounded-full text-[12px] font-[600] leading-[16px] "
                  >
                    {genre.name}
                    <img src="/rightArrow.svg" alt="" />
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <div className="max-w-[1277px] w-full flex flex-wrap gap-[48px]  justify-center mt-9 ">
        {selectGenres.results.map((movie: MovieType, index: number) => {
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
      </div>
    </div>
  );
}
