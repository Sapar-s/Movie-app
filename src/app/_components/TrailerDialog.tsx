import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TrailerType } from "@/utils/types";
import Image from "next/image";
import { fetchData } from "./FetchData";
import { useEffect, useState } from "react";

export const TrailerDialog = ({ movieId }: { movieId: number }) => {
  const [getTrailer, setGetTrailer] = useState<TrailerType | null>(null);
  useEffect(() => {
    const getData = async () => {
      const getTrailer = await fetchData(
        `/movie/${movieId}/videos?language=en-US`
      );
      setGetTrailer(getTrailer);
      console.log("trailers", getTrailer.results);
    };
    getData();
  }, []);
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="py-2 px-4  rounded-md flex gap-2 h-10 mt-4 bg-secondary  items-center absolute top-[402px] left-[156px] "
          >
            <Image src="/play.svg" alt="" height={16} width={16} />
            Watch Trailer
          </Button>
        </DialogTrigger>
        <DialogContent className=" border-none p-0 m-0 bg-none w-[997px] max-w-full">
          <iframe
            src={`https://www.youtube.com/embed/${getTrailer?.results[0]?.key}`}
            width={997}
            height={561}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            title={getTrailer?.results[0]?.name}
            allowFullScreen
          ></iframe>
          <DialogTitle className="hidden"></DialogTitle>
        </DialogContent>
      </Dialog>
    </>
  );
};
