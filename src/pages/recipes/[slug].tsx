import React from "react"

import { GetStaticPaths, GetStaticProps } from "next"
import fs from "fs-extra"
import path from "path"
import yaml from "js-yaml"
import SEO from "../../components/seo"
import { useCheckboxes } from "../../hooks/useCheckboxes"
import { Checkbox } from "../../components/checkbox"

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
  slug: string
  steps: string[]
  notes?: string[]
}

const Recipe: React.FC<RecipeProps> = ({
  title,
  description,
  ingredients,
  slug,
  steps,
  notes,
}) => {
  const { checked, handleToggle, clearChecked } = useCheckboxes(slug)

  return (
    <React.Fragment>
      <SEO title={title} description={description} />
      <h1 className="text-5xl ">{title}</h1>
      {description && <blockquote>{description}</blockquote>}
      <SectionTitle>Ingredients</SectionTitle>
      <button
        className="text-purple-700 font-bold underline underline-offset-4 mb-2"
        onClick={() => clearChecked()}
      >
        Chear checkboxes
      </button>
      <ul>
        {ingredients.map((ingredient, i) => {
          const ingredientKey = `${i}-${ingredient}`
          const isChecked = !!checked[ingredientKey]
          return (
            <li className="flex flex-row items-center mb-2" key={ingredient}>
              <Checkbox
                className="mr-2"
                checked={isChecked}
                onChange={(e) => {
                  handleToggle(ingredientKey)
                }}
              />
              <span className={isChecked ? "text-gray-400" : ""}>
                {ingredient}
              </span>
            </li>
          )
        })}
      </ul>
      <SectionTitle>Directions</SectionTitle>
      <ol className="step-list">
        {steps.map((step) => (
          <li className="step" key={step}>
            {step}
          </li>
        ))}
      </ol>
      {notes && (
        <div className="italic">
          <SectionTitle>Notes</SectionTitle>
          <ul className="list-dash">
            {notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>
      )}
    </React.Fragment>
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
  const parsedRecipeData = yaml.load(recipeData) as RecipeProps
  return { props: { slug, ...parsedRecipeData } }
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
