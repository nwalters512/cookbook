import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

export default ({ data }) => {
  const recipes = data.allRecipe.edges.map((r) => r.node)
  return (
    <Layout>
      <SEO title="Home" />
      {recipes.map((recipe) => (
        <article className="mb-4">
          <Link to={recipe.fields.slug} key={recipe.fields.slug}>
            <h2 className="text-2xl hover:text-pink-800 focus:text-pink-800">
              {recipe.title}
            </h2>
          </Link>
          {recipe.description && <p>{recipe.description}</p>}
        </article>
      ))}
    </Layout>
  )
}

export const query = graphql`
  query {
    allRecipe(sort: { fields: [title] }) {
      edges {
        node {
          title
          description
          fields {
            slug
          }
        }
      }
    }
  }
`
