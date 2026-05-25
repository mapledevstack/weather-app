import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import type { Location } from "../types"

type Props = {
  location: Location,
  setLocation: (location: Location) => void
}

const Map = ({location, setLocation}: Props) => {
  const {lat, lon} = location
  return (
    <MapContainer center={[lat, lon]} zoom={5} style={{width: "600px", height: "300px"}}>
      
      <MapClick setLocation={setLocation}/>
      
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lon]} />
    </MapContainer>
  )
}
export default Map

const MapClick = ({setLocation}: {setLocation: (location: Location) => void}) => {
  const map = useMap()

  map.on('click', e => {
    let {lat, lng} = e.latlng
    map.panTo([lat, lng])
    
    if(lng > 180) lng -= 360
    if(lng < -180) lng += 360

    setLocation({lat: lat, lon: lng})
  })

  return null
}
