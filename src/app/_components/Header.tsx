import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { ModeToggle } from "@/components/ui/theme-toggle";
import { fetchData } from "./Genre";
import { Genre } from "@/utils/types";

export const Header = async () => {
  const genres = "/genre/movie/list?language=en";

  const results = await fetchData(genres);

  return (
    <div className="w-[100vw] sticky top-0 z-20 bg-background">
      <div className="max-w-[1440px] h-[59px] px-4 flex items-center justify-between m-auto ">
        <div className="flex gap-2 ">
          <img src="/filmLogo.svg" alt="" />
          <h3 className="text-[#4338CA] text-base font-[700] ">Movie Z</h3>
        </div>
        <div className="flex gap-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="font-[500] leading-[20px] ">
                <img src="/chevronDown.svg" alt="" />
                Genre
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[577px] p-[20px]">
              <div className="flex flex-wrap gap-4 ">
                {results.genres.map((genre: Genre, index: number) => {
                  return (
                    <Button
                      key={index}
                      variant="outline"
                      className="py-[2px] pl-[10px] pr-1 h-[22px] rounded-full "
                    >
                      {genre.name}
                      <img src="/rightArrow.svg" alt="" />
                    </Button>
                  );
                })}
              </div>
            </PopoverContent>
          </Popover>

          <div className="flex items-center border-[1px] w-[379px] px-3 border-[#E4E4E7] rounded-lg focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring  ">
            <img src="/magnifying-glass.svg" alt="" className="w-4 h-4 " />
            <Input
              type="text"
              className="border-none rounded-none focus:outline-none focus:ring-0 "
              placeholder="Search..."
            />
          </div>
        </div>
        <ModeToggle />
      </div>
    </div>
  );
};
