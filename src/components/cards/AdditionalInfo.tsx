import { useSuspenseQuery } from "@tanstack/react-query"
import { getWeather } from "../../api"
import Card from "./Card"
import { WiBarometer, WiNightCloudyHigh, WiRain, WiWindDeg } from "react-icons/wi"
import { LuArrowUp } from "react-icons/lu"
import type { Coordinates } from "../../types"

type Props = {
  location: Coordinates
}

const AdditionalInfo = ({location}: Props) => {
  const { data } = useSuspenseQuery({
    queryKey: ['weather', location],
    queryFn: () => getWeather({lat: location.lat, lon: location.lon})
  })

  return (
    <Card title="Additional Weather Info" childrenClassName="flex flex-col gap-8">
      {
        rows.map(({label, value, Icon}) => {
          return (
            <div key={label} className="flex justify-between">
              <div className="flex items-center gap-4">
                <span className="text-gray-500">{label}</span>
                <Icon className="size-8"/>
              </div>
              <FormatComponent value={value} number={data?.current[value]}/>
            </div>
          )
        })
      }
    </Card>
  )
}
export default AdditionalInfo

const FormatComponent = ({value, number}: {value: string, number: number|undefined}) => {
  if(value === "wind_direction_10m") {
    return <LuArrowUp className="size-8" style={{transform: `rotate(${number}deg)`}}/>
  }

  return number
}

const rows = [
  {
    label: "Surface Pressure (hPa)",
    value: "surface_pressure",
    Icon: WiBarometer
  },
  {
    label: "Cloud Cover (%)",
    value: "cloud_cover",
    Icon: WiNightCloudyHigh
  },
  {
    label: "Wind Direction (°)",
    value: "wind_direction_10m",
    Icon: WiWindDeg
  },
  {
    label: "Rain (mm)",
    value: "rain",
    Icon: WiRain
  }
] as const
