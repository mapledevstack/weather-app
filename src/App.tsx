import { useQuery } from "@tanstack/react-query"
import { getWeather } from "./api"

const App = () => {

  const { data } = useQuery({
    queryKey: ['weather'],
    queryFn: () => getWeather({lat: 60, lon: 120})
  })

  return (
    <div>{JSON.stringify(data)}</div>
  )
}
export default App
