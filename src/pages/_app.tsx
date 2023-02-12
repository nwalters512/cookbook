import React from "react"
import type { AppProps } from "next/app"
import { Source_Sans_Pro } from "@next/font/google"

import Header from "../components/header"

import "../tailwind.css"
import SEO from "../components/seo"
import ContentContainer from "../components/content-container"

const sourceSansPro = Source_Sans_Pro({
  weight: ["400", "700"],
  subsets: ["latin"],
})

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <main className={sourceSansPro.className}>
      <SEO />
      <Header title="Nathan's Cookbook" />
      <ContentContainer>
        <div className="my-8">
          <Component {...pageProps} />
        </div>
      </ContentContainer>
    </main>
  )
}

export default App
