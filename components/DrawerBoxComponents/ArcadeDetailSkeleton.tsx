import { Skeleton } from "@nextui-org/skeleton";

function ArcadeDetailSkeleton() {
  return (
    <div className="w-full flex items-center gap-3">
      <div className="px-2 w-full flex flex-col gap-2">
        {/*TODO: make these into a component*/}
        <Skeleton className="h-6 w-9/12 rounded-lg" />
        <Skeleton className="h-4 w-11/12 rounded-lg" />
        <Skeleton className="h-4 w-11/12 rounded-lg" />
        <Skeleton className="h-4 w-11/12 rounded-lg" />
        <Skeleton className="h-4 w-11/12 rounded-lg" />
        <Skeleton className="h-4 w-11/12 rounded-lg" />
        <Skeleton className="h-4 w-11/12 rounded-lg" />
        <Skeleton className="h-4 w-11/12 rounded-lg" />
      </div>
    </div>
  );
}

export default ArcadeDetailSkeleton;
