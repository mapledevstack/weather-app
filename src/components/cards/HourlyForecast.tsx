import { useSuspenseQuery } from "@tanstack/react-query"
import { getWeather } from "../../api"
import Card from "./Card"
import WeatherIcon from "../WeatherIcon"
import type { Location } from "../../types"

type Props = {
  location: Location
}

const HourlyForecast = ({location}: Props) => {
  const { data } = useSuspenseQuery({
    queryKey: ['weather', location],
    queryFn: () => getWeather({lat: location.lat, lon: location.lon})
  })

  return (
    <Card title="Hourly Forecast" childrenClassName="flex gap-6 overflow-x-scroll">
      {
        data?.hourly.time.slice(0, 48).map((time, index) => {
          const hour = new Date(time)
          return (
            <div className="flex flex-col gap-2 items-center p-2" key={time}>
              
              <p className="whitespace-nowrap">{hour.toLocaleTimeString(undefined, {hour: "numeric", minute: "2-digit", hour12: true})}</p>

              <WeatherIcon code={data?.hourly.weather_code[index]}/>

              <p>{data?.hourly.temperature_2m[index]} °C</p>
            
            </div>
          )
        })
      }
    </Card>
  )
}
export default HourlyForecast
