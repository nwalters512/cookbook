import React from "react"
import type { AppProps } from "next/app"

import Header from "../components/header"

import "../tailwind.css"

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <React.Fragment>
      <Header title="Nathan's Cookbook" />
      <Component {...pageProps} />
    </React.Fragment>
  )
}

export default App
