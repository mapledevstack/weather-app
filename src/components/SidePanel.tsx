import { getAirPollution } from "@/api"
import type { Coordinates } from "@/types"
import { useSuspenseQuery } from "@tanstack/react-query"
import { Suspense } from "react"
import Card from "./cards/Card"
import { Slider } from "./ui/slider"
import clsx from "clsx"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"
import { LucideChevronLeft, LucideChevronRight, LucideInfo } from "lucide-react"
import AirPollutionSkeleton from "./skeletonLoaders/AirPollutionSkeleton"

type Props = {
  location: Coordinates
  showSidePanel: boolean
  setShowSidePanel: (showSidePanel: boolean) => void
}

const SidePanel = ({ location, showSidePanel, setShowSidePanel }: Props) => {
  return (
    <div className={clsx("fixed top-0 right-0 z-1001 shadow-md bg-sidebar transition-transform duration-300 ease-in-out", showSidePanel ? "" : 'translate-x-full')}>
      <div className="relative flex flex-col gap-3">
        <div className="absolute -translate-x-full">
          {
            showSidePanel 
              ? <LucideChevronRight className="bg-sidebar-ring size-18 p-2 rounded-b-md cursor-pointer transition-transform hover:scale-105 shadow-md" onClick={() => setShowSidePanel(false)}/>
              : <LucideChevronLeft className="bg-sidebar-ring size-18 p-2 rounded-b-md cursor-pointer transition-transform hover:scale-105 shadow-md" onClick={() => setShowSidePanel(true)}/>
          }
        </div>
        <div className="flex items-center gap-2 p-3 w-(--sidebar-width)">
          <h1 className="text-3xl font-semibold">Air Quality</h1>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <LucideInfo className="size-4"/>
              </TooltipTrigger>
              <TooltipContent className="z-2000 max-w-xs">
                <p>
                  Air quality data includes particulate matter (PM2.5, PM10), ozone, carbon monoxide, nitrogen dioxide, sulfur dioxide, and dust concentrations.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      
        <div className="h-screen overflow-y-scroll pl-2 pr-2">
          <Suspense fallback={<AirPollutionSkeleton />}>
            <AirPollution location={location}/>
          </Suspense>
        </div>

      </div>
    </div>
  )
}
export default SidePanel

const AirPollution = ({location}: {location: Coordinates}) => {
  const { data } = useSuspenseQuery({
    queryKey: ['pollution', location],
    queryFn: () => getAirPollution(location)
  })

  return (
    <div className="flex flex-col gap-4">
      {pollutants.map(pollutant => {
        
        const value = data.current[pollutant] || 0
        const max = Math.max(airQualityRanges[pollutant]["Very Poor"]["min"], value)
        
        const currentLevel = (() => {
          for(const [level, range] of Object.entries(airQualityRanges[pollutant])) {
            if(value >= range.min && value < range.max) return level
          }
          return "Very Poor"
        })()

        const units = data.current_units[pollutant]

        const qualityColor = (() => {
          switch(currentLevel) {
            case "Good":
              return 'bg-green-500'
            case "Fair":
              return 'bg-yellow-500'
            case "Moderate":
              return 'bg-orange-500'
            case "Poor":
              return 'bg-red-500'
            case "Very Poor":
              return 'bg-purple-500'
            default:
              return 'bg-zinc-500'
          }
        })()

        return (
          <Card key={pollutant} className="hover:scale-105 transition-transform duration-300 bg-linear-to-br from-sidebar-accent to-sidebar-accent/60 gap-0!" childrenClassName="flex flex-col gap-3">
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold">{pollutantInfo[pollutant].label}</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <LucideInfo className="size-4"/>
                    </TooltipTrigger>
                    <TooltipContent className="z-2000 max-w-xs">
                      <p>
                        {pollutantInfo[pollutant].description}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <span className="text-lg font-semibold">{value} {units}</span>
            </div>

            <Slider min={0} max={max} value={[value]} disabled />
            <div className="flex justify-between text-xs">
              <p>0 {units}</p>
              <p>{max} {units}</p>
            </div>
            <div className="flex justify-between">
              {Object.keys(airQualityRanges[pollutant]).map(quality => (
                <span key={quality} className={clsx("px-2 py-1 rounded-md text-xs font-medium", quality === currentLevel ? qualityColor : 'bg-muted text-muted-foreground')}>
                  {quality}
                </span>
              ))}
            </div>
          </Card>
        )
      })}
    </div>
  )
}

const pollutants = [
  "pm10",
  "pm2_5",
  "ozone",
  "carbon_monoxide",
  "dust",
  "nitrogen_dioxide",
  "sulphur_dioxide",
] as const;

export const airQualityRanges = {
  pm10: {
    Good: { min: 0, max: 50 },
    Fair: { min: 51, max: 100 },
    Moderate: { min: 101, max: 250 },
    Poor: { min: 251, max: 350 },
    "Very Poor": { min: 351, max: Infinity },
  },

  pm2_5: {
    Good: { min: 0, max: 30 },
    Fair: { min: 31, max: 60 },
    Moderate: { min: 61, max: 90 },
    Poor: { min: 91, max: 120 },
    "Very Poor": { min: 121, max: Infinity },
  },
  
  ozone: {
    Good: { min: 0, max: 50 },
    Fair: { min: 51, max: 100 },
    Moderate: { min: 101, max: 168 },
    Poor: { min: 169, max: 208 },
    "Very Poor": { min: 209, max: Infinity },
  },

  carbon_monoxide: {
    Good: { min: 0, max: 4000 },
    Fair: { min: 4001, max: 8000 },
    Moderate: { min: 8001, max: 12000 },
    Poor: { min: 12001, max: 15000 },
    "Very Poor": { min: 15001, max: Infinity },
  },

  dust: {
    Good: { min: 0, max: 50 },
    Fair: { min: 51, max: 150 },
    Moderate: { min: 151, max: 250 },
    Poor: { min: 251, max: 350 },
    "Very Poor": { min: 351, max: Infinity },
  },
  
  nitrogen_dioxide: {
    Good: { min: 0, max: 40 },
    Fair: { min: 41, max: 80 },
    Moderate: { min: 81, max: 180 },
    Poor: { min: 181, max: 280 },
    "Very Poor": { min: 281, max: Infinity },
  },

  sulphur_dioxide: {
    Good: { min: 0, max: 40 },
    Fair: { min: 41, max: 80 },
    Moderate: { min: 81, max: 380 },
    Poor: { min: 381, max: 800 },
    "Very Poor": { min: 801, max: Infinity },
  },


} as const;

export const pollutantInfo = {
  pm10: {
    label: "PM10",
    description: "Concentration of particulate matter smaller than 10 μm in diameter.",
  },

  pm2_5: {
    label: "PM2.5",
    description: "Concentration of fine particulate matter smaller than 2.5 μm in diameter.",
  },

  ozone: {
    label: "O₃",
    description: "Concentration of ground-level ozone, a pollutant formed by sunlight and emissions.",
  },

  carbon_monoxide: {
    label: "CO",
    description: "Concentration of carbon monoxide produced by vehicle exhaust and fuel combustion.",
  },

  dust: {
    label: "Dust",
    description: "Concentration of airborne dust particles from natural and human-made sources.",
  },

  nitrogen_dioxide: {
    label: "NO₂",
    description: "Concentration of nitrogen dioxide, commonly emitted by vehicles and industrial activity.",
  },

  sulphur_dioxide: {
    label: "SO₂",
    description: "Concentration of sulfur dioxide produced by burning sulfur-containing fuels.",
  },
} as const;
