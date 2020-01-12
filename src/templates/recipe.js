import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const SectionTitle = ({ children }) => (
  <h2 className="text-xl font-bold mt-4 mb-2">{children}</h2>
)

export default ({ data }) => {
  const { recipe } = data
  const ingredients = recipe.ingredients.map(ingredient => (
    <li className="hanging-indent">{ingredient}</li>
  ))
  const steps = recipe.steps.map(step => <li className="step">{step}</li>)
  return (
    <Layout>
      <SEO title={recipe.title} description={recipe.description} />
      <h1 className="text-5xl ">{recipe.title}</h1>
      <blockquote>{recipe.description}</blockquote>
      <SectionTitle>Ingredients</SectionTitle>
      <ul>{ingredients}</ul>
      <SectionTitle>Directions</SectionTitle>
      <ol className="step-list">{steps}</ol>
      {recipe.notes && (
        <div className="italic">
          <SectionTitle>Notes</SectionTitle>
          <ul className="list-dash">
            {recipe.notes.map(note => (
              <li>{note}</li>
            ))}
          </ul>
        </div>
      )}
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
