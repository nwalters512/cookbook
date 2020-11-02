import React from "react"
import type { AppProps } from "next/app"

import Header from "../components/header"

import "../tailwind.css"
import SEO from "../components/seo"

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <React.Fragment>
      <SEO />
      <Header title="Nathan's Cookbook" />
      <div className="w-full max-w-screen-md mx-auto mt-3">
        <Component {...pageProps} />
      </div>
    </React.Fragment>
  )
}

export default App
