import { useSuspenseQuery } from "@tanstack/react-query"
import Card from "./Card"
import { getWeather } from "../../api"
import { WEATHER_CODES } from "../../constants/weatherCodes"

const DailyForecast = () => {
  const { data } = useSuspenseQuery({
    queryKey: ['weather'],
    queryFn: () => getWeather({lat: 60, lon: 120})
  })

  return (
    <Card title="Daily Forecast">
      <div className="flex flex-col gap-4">
        {
          data?.daily.time.map((day, index) => {
            return (
              <div key={day}>
                <p>{day}</p>

                <p>{WEATHER_CODES[data?.daily.weather_code[index]]}</p>

                <p>{data?.daily.temperature_2m_mean[index]}</p>
                
                <p>{data?.daily.temperature_2m_min[index]}</p>

                <p>{data?.daily.temperature_2m_max[index]}</p>
              </div>
            )
          })
        }
      </div>
    </Card>
  )
}
export default DailyForecast
