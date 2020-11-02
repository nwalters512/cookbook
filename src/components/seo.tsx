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
      <title>${metaTitle}</title>
      <meta property="description" content={metaDescription} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta property="twitter:card" content="summary" />
      <meta property="twitter:creator" content="@waltersn512" />
      <meta property="twitter:title" content={metaTitle} />
      <meta property="twitter:description" content={metaDescription} />
    </Head>
  )
}

export default SEO
