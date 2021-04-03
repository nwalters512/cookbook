import React from "react"
import Link from "next/link"
import ContentContainer from "./content-container"

interface HeaderProps {
  title: string
}

const Header: React.FC<HeaderProps> = ({ title }) => (
  <header className="bg-purple-700">
    <ContentContainer>
      <h1 className="py-4">
        <Link href="/">
          <a className="text-white text-xl font-bold no-underline">{title}</a>
        </Link>
      </h1>
    </ContentContainer>
  </header>
)

export default Header
