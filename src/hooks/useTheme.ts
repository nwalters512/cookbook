import { useEffect, useState } from "react"

export function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    // Only access localStorage on client side
    if (typeof window === "undefined") return "light"

    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null
    if (savedTheme) return savedTheme

    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches
    return prefersDark ? "dark" : "light"
  })

  useEffect(() => {
    // Apply the theme class to the document
    document.documentElement.classList.remove("light", "dark")
    document.documentElement.classList.add(theme)
  }, [theme])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
  }

  return { theme, toggleTheme }
}
