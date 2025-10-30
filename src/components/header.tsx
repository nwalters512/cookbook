import React from "react"
import Link from "next/link"
import ContentContainer from "./content-container"
import ThemeToggle from "./theme-toggle"

interface HeaderProps {
  title: string
}

const Header: React.FC<HeaderProps> = ({ title }) => (
  <header className="bg-gradient-to-r from-orange-500 to-red-500 dark:from-orange-700 dark:to-red-800 shadow-lg">
    <ContentContainer>
      <div className="py-5 flex items-center justify-between">
        <h1>
          <Link
            href="/"
            className="text-white text-2xl font-bold no-underline hover:opacity-90 transition-opacity flex items-center gap-3"
          >
            <span className="text-3xl">🍳</span>
            {title}
          </Link>
        </h1>
        <ThemeToggle />
      </div>
    </ContentContainer>
  </header>
)

export default Header
