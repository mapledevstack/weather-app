import DailyForecast from "./components/cards/DailyForecast"
import HourlyForecast from "./components/cards/HourlyForecast"
import CurrentWeather from "./components/cards/CurrentWeather"
import AdditionalInfo from "./components/cards/AdditionalInfo"
import Map from "./components/Map"
import { Suspense, useEffect, useState } from "react"
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
import clsx from "clsx"

const App = () => {
  const [location, setLocation] = useState<Coordinates>({lat: 60, lon: 120})
  const [city, setCity] = useState('Tokyo')
  const [mapType, setMapType] = useState('dataviz-dark')
  const [showSidePanel, setShowSidePanel] = useState(true)

  useEffect(() => {
    const handleResize = () => {
      setShowSidePanel(window.innerWidth >= 1024)
    }

    handleResize()

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

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
      <div className={clsx("flex flex-col gap-8 w-full p-8 transition-[width] duration-300 ease-in-out", showSidePanel ? "lg:w-[calc(100vw-var(--sidebar-width))]" : "")}>
        <div className="flex justify-between max-[770px]:flex-col max-[770px]:gap-6">
          <div className="flex gap-4">
            <h1 className="text-2xl font-semibold">Location: </h1>
            <LocationDropdown city={city} setCity={setCity} />
          </div>
          <div className="flex gap-4 min-[770px]:-translate-x-16">
            <h1 className="text-2xl font-semibold">Map Type:</h1>
            <MapTypeDropdown mapType={mapType} setMapType={setMapType}/>
          </div>
        </div>
        
        <div className="grid grid-cols-1 2xl:flex-1 gap-4 md:grid-cols-2 2xl:grid-cols-4 2xl:grid-rows-4 2xl:h-screen">
          
          <div className="col-span-1 md:col-span-2 2xl:col-span-4 2xl:row-span-2 2xl:order-1">
            <Map location={coordinates} setLocation={setLocation} setCity={setCity} mapType={mapType} />
          </div>
          
          <div className="col-span-1 md:col-span-1 2xl:col-span-1 2xl:row-span-2 2xl:order-2">
            <Suspense fallback={<CurrentWeatherSkeleton />}>
              <CurrentWeather location={coordinates} />
            </Suspense>
          </div>
          
          <div className="col-span-1 md:col-span-1 2xl:col-span-1 2xl:row-span-2 2xl:order-4">
            <Suspense fallback={<DailyForecastSkeleton />}>
              <DailyForecast location={coordinates} />
            </Suspense>
          </div>
          
          <div className="col-span-1 md:col-span-2 2xl:col-span-2 2xl:row-span-1 2xl:order-3">
            <Suspense fallback={<HourlyForecastSkeleton />}>
              <HourlyForecast location={coordinates} />
            </Suspense>
          </div>
          
          <div className="col-span-1 md:col-span-2 2xl:col-span-2 2xl:row-span-1 2xl:order-5">
            <Suspense fallback={<AdditionalInfoSkeleton />}>
              <AdditionalInfo location={coordinates} />
            </Suspense>
          </div>
        
        </div>
      
      </div>

      <SidePanel location={coordinates} showSidePanel={showSidePanel} setShowSidePanel={setShowSidePanel} />
    </>
  )
}
export default App
