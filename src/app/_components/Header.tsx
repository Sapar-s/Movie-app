import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ModeToggle } from "@/components/ui/theme-toggle";

export const Header = () => {
  return (
    <div className="w-[1440px] h-[59px] px-4 flex items-center justify-between ">
      {/* <div className="mx-[64px] flex justify-between w-[100%] "> */}
      <div className="flex gap-2 ">
        <img src="/filmLogo.svg" alt="" />
        <h3 className="text-[#4338CA] text-base font-[700] ">Movie Z</h3>
      </div>
      <div className="flex gap-3">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Action</SelectItem>
            <SelectItem value="dark">Adventure</SelectItem>
            <SelectItem value="system">Animation</SelectItem>
            <SelectItem value="system">Comedy</SelectItem>
            <SelectItem value="system">Crime</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex items-center border-[1px] w-[379px] px-3 border-[#E4E4E7] rounded-lg focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring  ">
          <img src="/magnifying-glass.svg" alt="" className="w-4 h-4 " />
          <Input type="text" className="border-none rounded-none  " />
        </div>
      </div>
      <ModeToggle />
      {/* </div> */}
    </div>
  );
};
