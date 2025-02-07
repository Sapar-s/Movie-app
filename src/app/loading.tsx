import { Skeleton } from "@/components/ui/skeleton";

export default function HomeSkeletons() {
  return (
    <div className=" w-[100vw] flex flex-col items-center ">
      <Skeleton className="w-screen h-[600px] mt-[22px] " />
      <div className="max-w-[1277px] w-full">
        <div className="w-full flex justify-between mt-[52px] ">
          <Skeleton className="w-[250px] h-[36px] " />
          <Skeleton className="w-[165px] h-[32px] " />
        </div>
        <div className="w-full mt-9 flex flex-wrap gap-[31px] ">
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton key={index} className="w-[230px] h-[439px]  " />
          ))}
        </div>
        <div className="w-full flex justify-between mt-[52px] ">
          <Skeleton className="w-[250px] h-[36px] " />
          <Skeleton className="w-[165px] h-[32px] " />
        </div>
        <div className="w-full mt-9 flex flex-wrap gap-[31px] ">
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton key={index} className="w-[230px] h-[439px]  " />
          ))}
        </div>
        <div className="w-full flex justify-between mt-[52px] ">
          <Skeleton className="w-[250px] h-[36px] " />
          <Skeleton className="w-[165px] h-[32px] " />
        </div>
        <div className="w-full mt-9 flex flex-wrap gap-[31px] ">
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton key={index} className="w-[230px] h-[439px]  " />
          ))}
        </div>
      </div>
    </div>
  );
}
