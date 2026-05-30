import Card from "../cards/Card"
import { Skeleton } from "../ui/skeleton"

const PollutantCardSkeleton = () => {
  return (
    <Card className="hover:scale-105 transition-transform duration-300 bg-linear-to-br from-sidebar-accent to-sidebar-accent/60 gap-0!" childrenClassName="flex flex-col gap-3">
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <Skeleton className="w-17 h-7 bg-sidebar" />
              </div>
              <Skeleton className="w-23 h-7 bg-sidebar" />
            </div>

        <Skeleton className="w-81 h-1 dark:bg-sidebar" />
        <div className="flex justify-between text-xs">
          <Skeleton className="w-11 h-4 dark:bg-sidebar" />
          <Skeleton className="w-11 h-4 dark:bg-sidebar" />
        </div>
        <div className="flex justify-between">
          {Array.from({length: 5}).map((_, index) => (
            <Skeleton key={index} className="w-13 h-6 dark:bg-sidebar"/>
          ))}
        </div>
    </Card>
  )
}
export default PollutantCardSkeleton
