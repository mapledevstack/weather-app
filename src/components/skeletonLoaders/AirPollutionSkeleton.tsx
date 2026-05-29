import PollutantCardSkeleton from "./PollutantCardSkeleton"

const AirPollutionSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({length: 7}).map((_, index) => <PollutantCardSkeleton key={index}/>)}
    </div>
  )
}
export default AirPollutionSkeleton
