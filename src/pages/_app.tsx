import React from "react"
import type { AppProps } from "next/app"

import Header from "../components/header"

import "../tailwind.css"
import SEO from "../components/seo"
import ContentContainer from "../components/content-container"

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <div>
      <SEO />
      <Header title="Nathan's Cookbook" />
      <ContentContainer>
        <main id="main-content" className="py-4">
          <Component {...pageProps} />
        </main>
      </ContentContainer>
    </div>
  )
}

export default App
