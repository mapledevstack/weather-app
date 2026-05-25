import { useSuspenseQuery } from "@tanstack/react-query"
import Card from "./Card"
import { getWeather } from "../../api"
import WeatherIcon from "../WeatherIcon"
import type { Location } from "../../types"

type Props = {
  location: Location
}

const DailyForecast = ({location}: Props) => {
  const { data } = useSuspenseQuery({
    queryKey: ['weather', location],
    queryFn: () => getWeather({lat: location.lat, lon: location.lon})
  })

  return (
    <Card title="Daily Forecast" childrenClassName="flex flex-col gap-4">
        {
          data?.daily.time.map((day, index) => {
            const date = new Date(day)

            return (
              <div key={day} className="flex justify-between">

                <p className="w-8">{date.toLocaleDateString(undefined, {weekday:"short"})}</p>

                <WeatherIcon code={data?.daily.weather_code[index]}/>

                <p>{data?.daily.temperature_2m_mean[index]} °C</p>

                <p className="text-gray-500/75">{data?.daily.temperature_2m_min[index]} °C</p>

                <p className="text-gray-500/75">{data?.daily.temperature_2m_max[index]} °C</p>
              </div>
            )
          })
        }
    </Card>
  )
}
export default DailyForecast
