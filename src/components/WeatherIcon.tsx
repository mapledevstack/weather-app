import clsx from "clsx"
import { WEATHER_ICONS } from "../constants/weatherIcons"

type Props = {
  code: number,
  className?: string
}

const WeatherIcon = ({code, className}: Props) => {
  const Icon = WEATHER_ICONS[code]
  return (
    <Icon className={clsx("size-8", className)} />
  )
}
export default WeatherIcon
