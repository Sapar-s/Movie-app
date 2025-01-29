import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { ModeToggle } from "@/components/ui/theme-toggle";
import { fetchData } from "./Genre";
import { Genre } from "@/utils/types";
import Link from "next/link";
import Search from "./Search";

export const Header = async () => {
  const { genres } = await fetchData("/genre/movie/list?language=en");

  return (
    <div className="w-[100vw] sticky top-0 z-20 bg-background">
      <div className="max-w-[1440px] h-[59px] px-4 flex items-center justify-between m-auto ">
        <Link href="/">
          <div className="flex gap-2 ">
            <img src="/filmLogo.svg" alt="" />
            <h3 className="text-[#4338CA] text-base font-[700] ">Movie Z</h3>
          </div>
        </Link>
        <div className="flex">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="font-[500] leading-[20px] ">
                <img src="/chevronDown.svg" alt="" />
                Genre
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[577px] p-[20px] mr-[-480px] ">
              <h3 className="text-[24px] font-[600] leading-[32px] ">Genres</h3>
              <h4 className="text-[16px] font-[400] leading-[24px] mt-1 border-b-[1px] pb-4 border-border ">
                See lists of movies by genre
              </h4>
              <div className="flex flex-wrap gap-4 mt-4 ">
                {genres.map((genre: Genre, index: number) => {
                  // console.log("genre ni ", genre);
                  return (
                    <Link key={index} href={`/genres/${genre.id}`}>
                      <Button
                        key={index}
                        variant="outline"
                        className="py-[2px] pl-[10px] pr-1 h-[22px] rounded-full "
                      >
                        {genre.name}
                        <img src="/rightArrow.svg" alt="" />
                      </Button>
                    </Link>
                  );
                })}
              </div>
            </PopoverContent>
          </Popover>

          <Search />
        </div>
        <ModeToggle />
      </div>
    </div>
  );
};
