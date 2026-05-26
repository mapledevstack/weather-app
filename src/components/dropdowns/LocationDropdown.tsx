import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../ui/select"

type props = {
  city: string,
  setCity: (city: string) => void
}

const LocationDropdown = ({ city, setCity }: props) => {
  return (
    <Select value={city} onValueChange={(value) => setCity(value)}>
      <SelectTrigger className="w-45">
        <SelectValue placeholder="Choose a Popular City" />
      </SelectTrigger>
      <SelectContent className="z-1001">
        {
          city === 'custom' && <SelectItem value="custom">Custom</SelectItem>
        }

        {cities.map(city => {
          return (
            <SelectItem key={city} value={city}>{city}</SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}
export default LocationDropdown

const cities = [
  "New York",
  "London",
  "Tokyo",
  "Paris",
  "Dubai",
  "Singapore",
  "Sydney",
  "Toronto",
  "Berlin",
  "Los Angeles"
]
