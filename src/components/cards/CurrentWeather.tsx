import { useSuspenseQuery } from "@tanstack/react-query"
import { getWeather } from "../../api"
import Card from "./Card"
import WeatherIcon from "../WeatherIcon"
import { WEATHER_DESC } from "../../constants/weatherDescription"

const CurrentWeather = () => {
  const { data } = useSuspenseQuery({
    queryKey: ['weather'],
    queryFn: () => getWeather({lat:60, lon:120})
  })

  const date = new Date(data.current.time)

  return (
    <Card title="Current Weather" childrenClassName="flex flex-col gap-6">
      
      <div className="flex flex-col gap-2 items-center">
        <h2 className="text-6xl font-semibold">{data?.current.temperature_2m} °C</h2>
        <WeatherIcon code={data?.current.weather_code} className="size-14"/>
        <h3 className="capitalize text-xl">{WEATHER_DESC[data?.current.weather_code]}</h3>
      </div>

      <div className="flex flex-col gap-2 items-center">
        <p className="text-xl">Local Time:</p>
        <h3 className="text-4xl font-semibold">{date.toLocaleTimeString(undefined, {hour: "numeric", minute: "2-digit", hour12: true, timeZone: data?.timezone})}</h3>
      </div>

      <div className="flex justify-between">
        <div className="flex flex-col gap-2 items-center">
          <p className="text-gray-500">Feels Like</p>
          <p>{data?.current.apparent_temperature} °C</p>
        </div>

        <div className="flex flex-col gap-2 items-center">
          <p className="text-gray-500">Humidity</p>
          <p>{data?.current.relative_humidity_2m} %</p>
        </div>

        <div className="flex flex-col gap-2 items-center">
          <p className="text-gray-500">Wind</p>
          <p>{data?.current.wind_speed_10m} Km/h</p>
        </div>
      </div>

    </Card>
  )
}
export default CurrentWeather
