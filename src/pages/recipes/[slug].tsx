import React from "react"

import { GetStaticPaths, GetStaticProps } from "next"
import fs from "fs-extra"
import path from "path"
import yaml from "js-yaml"

interface RecipePathsParams {
  slug: string
  [param: string]: any
}

const SectionTitle: React.FC = ({ children }) => (
  <h2 className="text-xl font-bold mt-4 mb-2">{children}</h2>
)

interface RecipeProps {
  title: string
  description?: string
  ingredients: string[]
  steps: string[]
  notes?: string[]
}

const Recipe: React.FC<RecipeProps> = ({
  title,
  description,
  ingredients,
  steps,
  notes,
}) => {
  return (
    <Layout>
      <SEO title={title} description={description} />
      <h1 className="text-5xl ">{title}</h1>
      {description && <blockquote>{description}</blockquote>}
      <SectionTitle>Ingredients</SectionTitle>
      <ul>
        {ingredients.map((ingredient) => (
          <li className="hanging-indent">{ingredient}</li>
        ))}
      </ul>
      <SectionTitle>Directions</SectionTitle>
      <ol className="step-list">
        {steps.map((step) => (
          <li className="step">{step}</li>
        ))}
      </ol>
      {notes && (
        <div className="italic">
          <SectionTitle>Notes</SectionTitle>
          <ul className="list-dash">
            {notes.map((note) => (
              <li>{note}</li>
            ))}
          </ul>
        </div>
      )}
    </Layout>
  )
}

export default Recipe

export const getStaticProps: GetStaticProps<
  RecipeProps,
  RecipePathsParams
> = async (context) => {
  const { slug } = context.params
  const recipeData = await fs.readFile(
    path.join(process.cwd(), "recipes", slug, "index.yml"),
    "utf-8"
  )
  const parsedRecipeData = yaml.safeLoad(recipeData) as RecipeProps
  return { props: parsedRecipeData }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const recipes = await fs.readdir(path.join(process.cwd(), "recipes"))
  return {
    paths: recipes.map((slug) => ({
      params: {
        slug,
      },
    })),
    fallback: false,
  }
}
