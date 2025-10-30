import React from "react"
import type { AppProps } from "next/app"
import { Source_Sans_3 } from "next/font/google"

import Header from "../components/header"

import "../tailwind.css"
import SEO from "../components/seo"
import ContentContainer from "../components/content-container"

const sourceSans3 = Source_Sans_3({
  weight: ["400", "700"],
  subsets: ["latin"],
})

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <div
      className={`${sourceSans3.className} min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors`}
    >
      <SEO />
      <Header title="Nathan's Cookbook" />
      <ContentContainer>
        <main className="my-8">
          <Component {...pageProps} />
        </main>
      </ContentContainer>
    </div>
  )
}

export default App
