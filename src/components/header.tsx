import React from "react"
import Link from "next/link"
import ContentContainer from "./content-container"
import ThemeToggle from "./theme-toggle"

interface HeaderProps {
  title: string
}

const Header: React.FC<HeaderProps> = ({ title }) => (
  <header className="bg-blue-600 dark:bg-blue-900 shadow-md">
    <ContentContainer>
      <div className="py-4 flex items-center justify-between">
        <h1>
          <Link
            href="/"
            className="text-white text-xl font-bold no-underline hover:opacity-90 transition-opacity"
          >
            {title}
          </Link>
        </h1>
        <ThemeToggle />
      </div>
    </ContentContainer>
  </header>
)

export default Header
