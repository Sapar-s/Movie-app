import { ModeToggle } from "@/components/ui/theme-toggle";
import Link from "next/link";
import Search from "./Search";
import { Genres } from "./Genres";

export const Header = () => {
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
          <Genres />
          <Search />
        </div>
        <ModeToggle />
      </div>
    </div>
  );
};
