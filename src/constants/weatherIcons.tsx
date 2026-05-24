import { WiDaySunny, WiDayCloudy, WiCloudy, WiFog, WiSprinkle, WiRain, WiRainMix, WiSnow, WiSnowWind, WiShowers, WiThunderstorm, WiHail } from "react-icons/wi"

import type { IconType } from "react-icons"

export const WEATHER_ICONS: Record<number, IconType> = {
  0: WiDaySunny,

  1: WiDayCloudy,
  2: WiDayCloudy,
  3: WiCloudy,

  45: WiFog,
  48: WiFog,

  51: WiSprinkle,
  53: WiSprinkle,
  55: WiSprinkle,

  56: WiRainMix,
  57: WiRainMix,

  61: WiRain,
  63: WiRain,
  65: WiRain,

  66: WiRainMix,
  67: WiRainMix,

  71: WiSnow,
  73: WiSnow,
  75: WiSnow,

  77: WiSnowWind,

  80: WiShowers,
  81: WiShowers,
  82: WiShowers,

  85: WiSnow,
  86: WiSnow,

  95: WiThunderstorm,

  96: WiHail,
  99: WiHail,
}
