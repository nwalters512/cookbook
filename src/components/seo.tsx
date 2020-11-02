import React from "react"
import Head from "next/head"

interface SEOProps {
  description?: string
  title?: string
}

const SEO: React.FC<SEOProps> = ({ description, title }) => {
  const metaTitle = title ? `${title} | Nathan's Cookbook` : "Nathan's Cookbook"
  const metaDescription = description || "My favorite recipes!"

  return (
    <Head>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="og:title" content={metaTitle} />
      <meta name="og:description" content={metaDescription} />
      <meta name="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content="@waltersn512" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
    </Head>
  )
}

export default SEO
