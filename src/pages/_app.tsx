import React from "react"
import type { AppProps } from "next/app"

import Header from "../components/header"

import "../tailwind.css"
import SEO from "../components/seo"
import ContentContainer from "../components/content-container"

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <React.Fragment>
      <SEO />
      <Header title="Nathan's Cookbook" />
      <ContentContainer>
        <div className="my-8">
          <Component {...pageProps} />
        </div>
      </ContentContainer>
    </React.Fragment>
  )
}

export default App
