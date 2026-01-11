import React from "react"
import Link from "next/link"
import ContentContainer from "./content-container"
import ThemeToggle from "./theme-toggle"

interface HeaderProps {
  title: string
}

const Header: React.FC<HeaderProps> = ({ title }) => (
  <>
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-blue-600 focus:rounded focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
    >
      Skip to main content
    </a>
    <header className="bg-blue-600 dark:bg-blue-900 shadow-md">
      <ContentContainer>
        <div className="py-3 flex items-center justify-between">
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
  </>
)

export default Header
