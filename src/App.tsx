import DailyForecast from "./components/cards/DailyForecast"
import HourlyForecast from "./components/cards/HourlyForecast"
import CurrentWeather from "./components/cards/CurrentWeather"
import AdditionalInfo from "./components/cards/AdditionalInfo"
import Map from "./components/Map"
import { useState } from "react"
import type { Location } from "./types"
import LocationDropdown from "./components/dropdowns/LocationDropdown"
import { useQuery } from "@tanstack/react-query"
import { getGeoCode } from "./api"
import MapTypeDropdown from "./components/dropdowns/MapTypeDropdown"

const App = () => {
  const [location, setLocation] = useState<Location>({lat: 60, lon: 120})
  const [city, setCity] = useState('Tokyo')
  const [mapType, setMapType] = useState('dataviz-dark')

  const { data: geoCodeData } = useQuery({
    queryKey: ['geoCode', city],
    queryFn: () => getGeoCode(city)
  })

  const coordinates = 
                      city === 'custom' 
                                  ? location 
                                  : {lat: geoCodeData?.results[0].latitude ?? 0, lon: geoCodeData?.results[0].longitude ?? 0}

  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-8">
        <div className="flex gap-4">
          <h1 className="text-2xl font-semibold">Location: </h1>
          <LocationDropdown city={city} setCity={setCity} />
        </div>
        <div className="flex gap-4">
          <h1 className="text-2xl font-semibold">Map Type:</h1>
          <MapTypeDropdown mapType={mapType} setMapType={setMapType}/>
        </div>
      </div>
      <Map location={coordinates} setLocation={setLocation} setCity={setCity} mapType={mapType} />
      <CurrentWeather location={coordinates} />
      <HourlyForecast location={coordinates} />
      <DailyForecast location={coordinates} />
      <AdditionalInfo location={coordinates} />
    </div>
  )
}
export default App
