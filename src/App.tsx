import DailyForecast from "./components/cards/DailyForecast"
import HourlyForecast from "./components/cards/HourlyForecast"
import CurrentWeather from "./components/cards/CurrentWeather"
import AdditionalInfo from "./components/cards/AdditionalInfo"
import Map from "./components/Map"
import { Suspense, useState } from "react"
import type { Coordinates } from "./types"
import LocationDropdown from "./components/dropdowns/LocationDropdown"
import { useQuery } from "@tanstack/react-query"
import { getGeoCode } from "./api"
import MapTypeDropdown from "./components/dropdowns/MapTypeDropdown"
import AdditionalInfoSkeleton from "./components/skeletonLoaders/AdditionalInfoSkeleton"
import DailyForecastSkeleton from "./components/skeletonLoaders/DailyForecastSkeleton"
import HourlyForecastSkeleton from "./components/skeletonLoaders/HourlyForecastSkeleton"
import CurrentWeatherSkeleton from "./components/skeletonLoaders/CurrentWeatherSkeleton"
import SidePanel from "./components/SidePanel"

const App = () => {
  const [location, setLocation] = useState<Coordinates>({lat: 60, lon: 120})
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
    <>
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
      
        <Suspense fallback={<CurrentWeatherSkeleton />}>
          <CurrentWeather location={coordinates} />
        </Suspense>
      
        <Suspense fallback={<HourlyForecastSkeleton />}>
          <HourlyForecast location={coordinates} />
        </Suspense>
      
        <Suspense fallback={<DailyForecastSkeleton />}>
          <DailyForecast location={coordinates} />
        </Suspense>
        <Suspense fallback={<AdditionalInfoSkeleton />}>
          <AdditionalInfo location={coordinates} />
        </Suspense>
      </div>

      <SidePanel location={coordinates} />
    </>
  )
}
export default App
