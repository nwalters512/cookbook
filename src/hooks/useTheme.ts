import { useEffect, useRef, useState } from "react"

function getInitialTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light"

  const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null
  if (savedTheme) return savedTheme

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light"
}

export function useTheme() {
  const isInitialMount = useRef(true)
  const [theme, setTheme] = useState<"light" | "dark">("light")

  // Initialize theme on mount - this is intentional and safe
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      const initialTheme = getInitialTheme()
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTheme(initialTheme)
      document.documentElement.classList.remove("light", "dark")
      document.documentElement.classList.add(initialTheme)
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    // Immediately update DOM for instant feedback
    document.documentElement.classList.remove("light", "dark")
    document.documentElement.classList.add(newTheme)
  }

  return { theme, toggleTheme }
}
