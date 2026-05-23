import { useQuery } from "@tanstack/react-query"
import { getWeather } from "./api"
import Card from "./components/cards/Card"
import DailyForecast from "./components/cards/DailyForecast"

const App = () => {

  const { data } = useQuery({
    queryKey: ['weather'],
    queryFn: () => getWeather({lat: 60, lon: 120})
  })

  return (
    <div className="flex flex-col gap-8">
      <Card title="Current Weather">{JSON.stringify(data?.current)}</Card>
      <Card title="Hourly Forecast">{JSON.stringify(data?.hourly)}</Card>
      <DailyForecast />
    </div>
  )
}
export default App
