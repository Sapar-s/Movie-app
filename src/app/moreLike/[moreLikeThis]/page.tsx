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

export default async function MoreMovie(props: {
  params: Promise<{ moreLikeThis: string }>;
}) {
  // console.log(more);
  const { moreLikeThis } = await props.params;

  // const pages = () => {
  //   return "1";
  // };
  const getMovies = `/movie/${moreLikeThis}/similar?language=en-US&page=1`;
  const moreMovies = await fetchData(getMovies);
  console.log(moreMovies);

  return (
    <div className="w-[100vw] flex flex-col items-center ">
      <div>
        <h2 className="text-[30px] leading-[36px] font-[600] mt-[52px] ">
          More Like This
        </h2>
        <div className="max-w-[1277px] w-full flex flex-wrap gap-[32px] justify-center mt-9 ">
          {moreMovies.results.map((movie: MovieType, index: number) => {
            return (
              <div key={index}>
                <Link href={`/movieInfo/${movie.id}`}>
                  <div className="rounded-[8px] overflow-hidden ">
                    <div>
                      <Image
                        src={ConImg + "w500/" + movie?.poster_path}
                        alt=""
                        className=" "
                        width={229.73}
                        height={340}
                      />
                    </div>
                    <div className="p-2 flex flex-col items-start w-[229.73px] bg-secondary  h-[95px]">
                      <h3 className="text-[14px] flex gap-1 mt-1 ">
                        <img src="/star.svg" alt="" />
                        {movie?.vote_average}{" "}
                        <span className="text-[12px] text-[#71717A]  font-[400] leading-[16px] ">
                          /10
                        </span>
                      </h3>
                      <h2 className="text-[18px] ">{movie?.original_title}</h2>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
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
    </div>
  );
}
