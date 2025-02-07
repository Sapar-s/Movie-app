import { Skeleton } from "@/components/ui/skeleton";

export default function MovieInfoSkeleton() {
  return (
    <div className="w-[100vw] flex  justify-center">
      <div className="max-w-[1080px] w-full">
        <div className="flex mt-[52px] justify-between w-full">
          <div>
            <Skeleton className="w-[211px] h-[40px] " />
            <Skeleton className="w-[237px] h-[28px] mt-1 " />
          </div>
          <div>
            <Skeleton className="w-[83px] h-[20px] " />
            <Skeleton className="w-[83px] h-[16px] mt-2 " />
          </div>
        </div>
        <div className="mt-[24px] w-full flex justify-between">
          <Skeleton className="w-[290px] h-[428px] " />
          <Skeleton className="max-w-[760px] w-full h-[428px] " />
        </div>
        <div className="mt-8 flex gap-3">
          <Skeleton className="w-[77px] h-[20px] " />
          <Skeleton className="w-[97px] h-[20px] " />
          <Skeleton className="w-[77px] h-[20px] " />
          <Skeleton className="w-[72px] h-[20px] " />
        </div>
        <div className="mt-[22px]">
          <Skeleton className="w-full h-[22px] " />
          <Skeleton className="w-[669px] h-[22px] mt-1 " />
        </div>
        <div className="flex gap-[53px] border-b-[1px] mt-5 border-b-[#E4E4E7] pb-2 ">
          <Skeleton className="h-[28px] w-[64px] " />
          <Skeleton className="h-[28px] w-[137px] " />
        </div>
        <div className="flex gap-[53px] border-b-[1px] mt-5 border-b-[#E4E4E7] pb-2 ">
          <Skeleton className="h-[28px] w-[64px] " />
          <Skeleton className="h-[28px] w-[360px] " />
        </div>
        <div className="flex gap-[53px] border-b-[1px] mt-5 border-b-[#E4E4E7] pb-2 ">
          <Skeleton className="h-[28px] w-[64px] " />
          <Skeleton className="h-[28px] w-[355px] " />
        </div>
        <div className="mt-8 w-full flex justify-between">
          <Skeleton className="w-[250px] h-[36px] " />
          <Skeleton className="w-[165px] h-[32px] " />
        </div>
        <div className="flex gap-8 w-full mt-9">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="w-[190px] h-[372px]  " />
          ))}
        </div>
      </div>
    </div>
  );
}
