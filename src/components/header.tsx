import React from "react"
import Link from "next/link"

interface HeaderProps {
  title: string
}

const Header = ({ title }) => (
  <header
    style={{
      background: `rebeccapurple`,
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link href="/">
          <a
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            {title}
          </a>
        </Link>
      </h1>
    </div>
  </header>
)

export default Header
