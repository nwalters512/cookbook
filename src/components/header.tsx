import React from "react"
import Link from "next/link"

interface HeaderProps {
  title: string
}

const Header: React.FC<HeaderProps> = ({ title }) => (
  <header className="bg-purple-900">
    <div className="w-full max-w-screen-md mx-auto">
      <h1 className="py-6">
        <Link href="/">
          <a className="text-white no-underline">{title}</a>
        </Link>
      </h1>
    </div>
  </header>
)

export default Header
