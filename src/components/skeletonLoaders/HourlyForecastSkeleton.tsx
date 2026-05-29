import Card from "../cards/Card"
import { Skeleton } from "../ui/skeleton"

const HourlyForecastSkeleton = () => {
  return (
    <Card title="Hourly Forecast" childrenClassName="flex gap-6 overflow-x-scroll">
      {
        Array(48).fill(null).map((_, index) => {
          return (
            <div className="flex flex-col gap-2 items-center p-2" key={index}>
              <Skeleton className="w-16 h-6" />
              <Skeleton className="size-8 rounded-full" />
              <Skeleton className="w-12 h-6" />
            </div>
          )
        })
      }
    </Card>
  )
}
export default HourlyForecastSkeleton
