import { fetchData } from "@/app/_components/Genre";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ConImg } from "@/utils/constants";
import { MovieType } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";

export default async function MoreMovie({
  params: { more },
}: {
  params: { more: string };
}) {
  // console.log(more);

  const getMovies = `/movie/${more}?language=en-US&page=1`;
  const moreMovies = await fetchData(getMovies);
  // console.log(moreMovies);

  return (
    <>
      <div className="max-w-[1277px] w-full flex flex-wrap gap-[31px]  justify-center mt-9 ">
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
      </div>

      <Pagination className="w-[100vw] flex justify-end mt-8">
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
      </Pagination>
    </>
  );
}
