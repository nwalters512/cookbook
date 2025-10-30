import { useEffect, useState } from "react"

function getInitialTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light"

  const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null
  if (savedTheme) return savedTheme

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
  return prefersDark ? "dark" : "light"
}

export function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">(getInitialTheme)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
  }, [theme])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
  }

  return { theme, toggleTheme }
}
