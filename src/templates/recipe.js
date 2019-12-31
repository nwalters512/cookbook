import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

export default ({ data }) => {
  const { recipe } = data
  const ingredients = recipe.ingredients.map(ingredient => (
    <li>{ingredient}</li>
  ))
  const steps = recipe.steps.map(step => <li>{step}</li>)
  return (
    <Layout>
      <SEO title={recipe.title} description={recipe.description} />
      <h1 className="text-5xl">{recipe.title}</h1>
      <blockquote>{recipe.description}</blockquote>
      <h2 className="text-3xl">Ingredients</h2>
      <ul className="list-disc">{ingredients}</ul>
      <h2 className="text-3xl">Steps</h2>
      <ol className="list-decimal">{steps}</ol>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    recipe(fields: { slug: { eq: $slug } }) {
      title
      description
      ingredients
      steps
      notes
    }
  }
`
