import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from "react-leaflet"
import { useEffect } from "react"
import "leaflet/dist/leaflet.css"
import type { Coordinates } from "../types"
const MAPTILER_API = import.meta.env.VITE_MAPTILER_KEY

type Props = {
  location: Coordinates
  setLocation: (location: Coordinates) => void
  setCity: (city: string) => void
  mapType: string
}

const Map = ({ location, setLocation, setCity, mapType }: Props) => {
  
  return (
    <MapContainer center={[location.lat, location.lon]} zoom={5} style={{ width: "600px", height: "300px" }}>
      
      <Recenter location={location} />
      <MapClick setLocation={setLocation} setCity={setCity} />
      <Marker position={[location.lat, location.lon]} />

      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url={`https://api.maptiler.com/maps/${mapType}/{z}/{x}/{y}.png?key=${MAPTILER_API}`}
      />
    </MapContainer>
  )
}

export default Map

const Recenter = ({ location }: { location: Coordinates }) => {
  const map = useMap()

  useEffect(() => {
    map.panTo([location.lat, location.lon])
  }, [location])

  return null
}

type ClickProps = Pick<Props, "setLocation" | "setCity">

const MapClick = ({ setLocation, setCity }: ClickProps) => {
  useMapEvents({
    click(e) {
      let { lat, lng } = e.latlng

      if (lng > 180) lng -= 360
      if (lng < -180) lng += 360

      setLocation({lat: lat, lon: lng})
      setCity("custom")
    },
  })

  return null
}
