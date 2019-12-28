import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

export default ({ data }) => {
  console.log(data);
  const recipes = data.allRecipe.edges.map(r => r.node);
  return (
    <Layout>
      <SEO title="Home" />
      {recipes.map(recipe => (
        <Link to={recipe.fields.slug}>
          <h2 key={recipe.fields.slug}>{recipe.title}</h2>
        </Link>
      ))}
    </Layout>
  )
}

export const query = graphql`
  query {
    allRecipe {
      edges {
        node {
          title
          fields {
            slug
          }
        }
      }
    }
  }
`;

