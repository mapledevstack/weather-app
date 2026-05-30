import { LucideMoon, LucideSun } from "lucide-react"
import { Switch } from "./ui/switch"
import { useTheme } from "./ThemeProvider"

const LightDarkToggle = () => {
  const {theme, toggleTheme} = useTheme()

  return (
    <div className="flex gap-5 items-center">
      <LucideSun className="size-8" />
      <Switch className="size-6" checked={theme==='dark'} onCheckedChange={toggleTheme} />
      <LucideMoon className="size-8" />
    </div>
  )
}
export default LightDarkToggle
