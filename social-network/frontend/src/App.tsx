import { RouterProvider } from 'react-router-dom'
import { routes } from './config/routes'
import { ThemeProvider, useTheme } from './context/ThemeContext'

const THEME_BG: Record<string, string> = {
  light:  '#f8fcff',
  dark:   '#0f172a',
  blue:   '#e8f4fb',
  system: window.matchMedia('(prefers-color-scheme: dark)').matches
    ? '#0f172a' : '#f8fcff',
}

// Inner component so it can consume the context
function AppShell() {
  const { theme } = useTheme()

  return (
    // Inline style overrides any Tailwind bg-* class on this element
    <div
      data-theme={theme}
      className="min-h-screen transition-colors duration-200"
      style={{ backgroundColor: THEME_BG[theme], minHeight: '100vh' }}
    >
      <RouterProvider router={routes} />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AppShell />
    </ThemeProvider>
  )
}