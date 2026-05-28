import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../ui/select"

type props = {
  mapType: string,
  setMapType: (mapType: string) => void
}

const MapTypeDropdown = ({ mapType, setMapType }: props) => {
  return (
    <Select value={mapType} onValueChange={(value) => setMapType(value)}>
      <SelectTrigger className="w-45">
        <SelectValue placeholder="Choose a Map Type"/>
      </SelectTrigger>
      <SelectContent className="z-1001">
        {maps.map(({label, value}) => {
          return (
            <SelectItem key={label} value={value}>{label}</SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}
export default MapTypeDropdown

const maps = [
  { label: "Dark", value: "dataviz-dark" },
  { label: "Streets", value: "streets" },
  { label: "Satellite", value: "hybrid" },
  { label: "Terrain", value: "outdoor-v2" },
  { label: "Bright", value: "bright-v2" },
  { label: "Basic", value: "basic-v2" },
  { label: "Winter", value: "winter-v2" },
  { label: "Ocean", value: "ocean" },
]
