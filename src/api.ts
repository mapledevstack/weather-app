import { weatherSchema } from "./schemas/weatherSchema"

export const getWeather = async ({ lat, lon }: {lat: number, lon: number}) => {
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,relative_humidity_2m,surface_pressure,cloud_cover,wind_speed_10m,wind_direction_10m,weather_code,rain&hourly=temperature_2m,apparent_temperature,relative_humidity_2m,surface_pressure,cloud_cover,visibility,wind_speed_10m,wind_direction_10m,precipitation_probability,rain,weather_code&daily=sunrise,sunset,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_probability_max,rain_sum,wind_speed_10m_max,wind_direction_10m_dominant,weather_code&timezone=auto`
  )
  const data = await res.json()
  return weatherSchema.parse(data)
}
