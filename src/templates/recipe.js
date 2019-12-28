import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

export default ({ data }) => {
  const { recipe } = data;
  const ingredients = recipe.ingredients.map(ingredient => <li>{ingredient}</li>);
  const steps = recipe.steps.map(step => <li>{step}</li>);
  return (
    <Layout>
      <SEO title="Home" />
      <h1>{recipe.title}</h1>
      <h2>Ingredients</h2>
      <ul>
        {ingredients}
      </ul>
      <h2>Steps</h2>
      <ol>
        {steps}
      </ol>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    recipe(fields: { slug: { eq: $slug } }) {
      title
      ingredients
      steps
      notes
    }
  }
`;
