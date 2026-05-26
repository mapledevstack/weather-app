import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from "react-leaflet"
import { useEffect } from "react"
import "leaflet/dist/leaflet.css"
import type { Location } from "../types"

type Props = {
  location: Location
  setLocation: (location: Location) => void
  setCity: (city: string) => void
}

const Map = ({ location, setLocation, setCity }: Props) => {
  const { lat, lon } = location

  return (
    <MapContainer center={[lat, lon]} zoom={5} style={{ width: "600px", height: "300px" }}>
      
      <Recenter location={location} />

      <MapClick setLocation={setLocation} setCity={setCity} />

      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={[lat, lon]} />

    </MapContainer>
  )
}

export default Map

const Recenter = ({ location }: { location: Location }) => {
  const map = useMap()

  useEffect(() => {
    map.panTo([location.lat, location.lon])
  }, [location, map])

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
