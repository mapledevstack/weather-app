import Card from "../cards/Card"
import { Skeleton } from "../ui/skeleton"

const DailyForecastSkeleton = () => {
  return (
    <Card title="Daily Forecast" childrenClassName="flex flex-col gap-4" className="pb-9">
        {
          Array(7).fill(null).map((_, index) => {
            return (
              <div key={index} className="flex justify-between">

                <Skeleton className="size-8" />
                <Skeleton className="size-8 rounded-full" />

                <Skeleton className="h-8 w-12" />
                <Skeleton className="h-8 w-12" />
                <Skeleton className="h-8 w-12" />
              </div>
            )
          })
        }
    </Card>
  )
}
export default DailyForecastSkeleton
