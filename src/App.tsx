import DailyForecast from "./components/cards/DailyForecast"
import HourlyForecast from "./components/cards/HourlyForecast"
import CurrentWeather from "./components/cards/CurrentWeather"
import AdditionalInfo from "./components/cards/AdditionalInfo"
import Map from "./components/Map"
import { useState } from "react"
import type { Location } from "./types"

const App = () => {
  const [location, setLocation] = useState<Location>({lat: 60, lon: 120})

  return (
    <div className="flex flex-col gap-8">
      <Map location={location} setLocation={setLocation} />
      <CurrentWeather location={location} />
      <HourlyForecast location={location} />
      <DailyForecast location={location} />
      <AdditionalInfo location={location} />
    </div>
  )
}
export default App
