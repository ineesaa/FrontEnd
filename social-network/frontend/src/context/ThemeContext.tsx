import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'

export type Theme = 'light' | 'dark' | 'blue' | 'system'

interface ThemeContextValue {
  theme:    Theme
  setTheme: (t: Theme) => void
}

const ThemeContext = createContext<ThemeContextValue>({
  theme:    'light',
  setTheme: () => {},
})

const THEME_STYLES: Record<Theme, { background: string; color: string }> = {
  light:  { background: '#f8fcff', color: '#3a5a6e' },
  dark:   { background: '#0f172a', color: '#e2e8f0' },
  blue:   { background: '#e8f4fb', color: '#1a4a6e' },
  system: {
    background: window.matchMedia('(prefers-color-scheme: dark)').matches
      ? '#0f172a' : '#f8fcff',
    color: window.matchMedia('(prefers-color-scheme: dark)').matches
      ? '#e2e8f0' : '#3a5a6e',
  },
}

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>(
    () => (localStorage.getItem('app_theme') as Theme) ?? 'light'
  )

  const setTheme = (t: Theme) => {
    setThemeState(t)
    localStorage.setItem('app_theme', t)
  }

  useEffect(() => {
    const root   = document.documentElement
    const styles = THEME_STYLES[theme]

    root.setAttribute('data-theme', theme)
    root.classList.remove('dark', 'theme-blue', 'theme-light', 'theme-system')
    if (theme === 'dark') root.classList.add('dark')
    if (theme === 'blue') root.classList.add('theme-blue')

    // Apply to body AND the wrapper div via CSS variable
    document.body.style.backgroundColor = styles.background
    document.body.style.color           = styles.color
    document.body.style.transition      = 'background-color 0.2s ease, color 0.2s ease'
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// Single hook — every component that calls this shares the same state
export const useTheme = () => useContext(ThemeContext)