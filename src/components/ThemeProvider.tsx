import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

type Theme = 'light' | 'dark'

type ThemeContextType = {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

type Props = {
  children: ReactNode
}

const ThemeProvider = ({children}: Props) => {
  const [theme, setTheme] = useState<Theme>('dark')
  
  const toggleTheme = () => {
    setTheme(prev => prev==='dark' ? 'light' : 'dark')
  }

  useEffect(() => {
    const root = document.documentElement
    if(theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    
  }, [theme])

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  )
}
export default ThemeProvider

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if(!context) throw Error("Use theme must be used within a Theme provider")
  return context
}
