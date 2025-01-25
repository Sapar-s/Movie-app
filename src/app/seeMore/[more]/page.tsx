import { Footer } from "@/app/_components/Footer";
import { Header } from "@/app/_components/Header";
import { ConImg } from "@/utils/constants";
import { MovieType } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";

export default function MoreMovie({
  params: { more },
}: {
  params: { more: object };
}) {
  console.log(more);
  return (
    <>
      <Header />
      <div>
        <div className="  flex flex-wrap gap-[31px]  justify-center mt-9 ">
          {more.map((movie: MovieType, index: number) => {
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
      </div>
      <Footer />
    </>
  );
}
