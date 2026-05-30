import Card from "../cards/Card"
import { Skeleton } from "../ui/skeleton"

const AdditionalInfoSkeleton = () => {
  return (
    <Card title="Additional Weather Info" childrenClassName="grid grid-cols-1 md:grid-cols-2 gap-8">
      {
        Array(4).fill(null).map((_, index) => {
          return (
            <div key={index} className="flex justify-between">
              <div className="flex items-center gap-4">
                <Skeleton className="w-32 h-6"/>
                <Skeleton className="size-8 rounded-full"/>
              </div>
              <Skeleton className="size-8" />
            </div>
          )
        })
      }
    </Card>
  )
}
export default AdditionalInfoSkeleton
