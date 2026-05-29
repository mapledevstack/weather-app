import Card from "../cards/Card"
import { Skeleton } from "../ui/skeleton"

const CurrentWeatherSkeleton = () => {
  return (
    <Card title="Current Weather" childrenClassName="flex flex-col gap-6">
      
      <div className="flex flex-col gap-2 items-center">
        <Skeleton className="w-46 h-15"/>
        <Skeleton className="size-14 rounded-full" />
        <Skeleton className="w-27 h-7" />
      </div>

      <div className="flex flex-col gap-2 items-center">
        <p className="text-xl">Local Time:</p>
        <Skeleton className="w-36 h-10" />
      </div>

      <div className="flex justify-between">
        <div className="flex flex-col gap-2 items-center">
          <p className="text-gray-500">Feels Like</p>
          <Skeleton className="w-12 h-6" />
        </div>

        <div className="flex flex-col gap-2 items-center">
          <p className="text-gray-500">Humidity</p>
          <Skeleton className="w-12 h-6" />
        </div>

        <div className="flex flex-col gap-2 items-center">
          <p className="text-gray-500">Wind</p>
          <Skeleton className="w-12 h-6" />
        </div>
      </div>

    </Card>
  )
}
export default CurrentWeatherSkeleton
