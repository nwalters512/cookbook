import React from "react"

import { GetStaticPaths, GetStaticProps } from "next"
import fs from "fs-extra"
import path from "path"
import yaml from "js-yaml"
import SEO from "../../components/seo"
import { useCheckboxes } from "../../hooks/useCheckboxes"
import { Checkbox } from "../../components/checkbox"
import { replaceFractionsWithUnicode } from "../../data/recipes"
import classNames from "classnames"

interface RecipePathsParams {
  slug: string
  [param: string]: any
}

interface SectionTitleProps {
  children: React.ReactNode
}

const SectionTitle: React.FC<SectionTitleProps> = ({ children }) => (
  <h2 className="text-xl font-bold mt-4 mb-2 uppercase">{children}</h2>
)

const NUMBER = "\\d+"
const FRACTION = `${NUMBER}\/${NUMBER}`
const UNICODE_FRACTION = "[\\u00BC-\\u00BE\\u2150-\\u215F]"
const MIXED_FRACTION = `(?:${NUMBER}\\s+(?:${FRACTION}|${UNICODE_FRACTION}))`
const RANGE_PART = `(?:${NUMBER}|${FRACTION}|${UNICODE_FRACTION})`
const RANGE = `(?:${RANGE_PART}\\s*(?:-|to)\\s*${RANGE_PART})`
const QUANTITY = `(?:${RANGE}|${MIXED_FRACTION}|${RANGE_PART})`
const UNITS = [
  // Weight
  "oz",
  "ozs",
  "ounce",
  "ounces",
  "lb",
  "lbs",
  "pound",
  "pounds",
  // Volume
  "tsp",
  "teaspoon",
  "teaspoons",
  "tbsp",
  "tablespoon",
  "tablespoons",
  "cup",
  "cups",
  "pint",
  "pints",
  "quart",
  "quarts",
  // Containers
  "jar",
  "jars",
  "can",
  "cans",
  "box",
  "boxes",
  "package",
  "packages",
  "carton",
  "cartons",
  // Misc
  "clove",
  "cloves",
  "slice",
  "slices",
  "pinch",
  "pinches",
  "strip",
  "strips",
  "dash",
  "dashes",
].join("|")
const QUANTITY_AND_UNITS = new RegExp(
  `(${QUANTITY}?\\s*(?:(?:${UNITS})\\s+)*)?(.*)`,
  "i"
)
console.log(QUANTITY_AND_UNITS)

function renderParenthesizedInfo(info: string): React.ReactNode {
  const match = info.match(/\([^\)]+\)/g)
  if (!match) return info

  // Break string into portions that are not parenthesized and those that are.
  let components: string[] = [info]
  for (const part of match) {
    components = components.flatMap((c) => {
      let split2 = c.split(part)
      return split2
        .flatMap((s) => [s, part])
        .slice(0, -1)
        .filter((s) => s.length > 0)
    })
  }

  return components.map((c, i) => (
    <span
      key={`${i}-${c}`}
      className={classNames({
        "text-slate-400": c.startsWith("("),
      })}
    >
      {c}
    </span>
  ))
}

function renderIngredient(ingredient: string): React.ReactNode {
  const match = ingredient.match(QUANTITY_AND_UNITS)
  if (!match) return renderParenthesizedInfo(ingredient)

  const maybeQuantity = match[1]
  if (!maybeQuantity) return renderParenthesizedInfo(ingredient)

  return (
    <span>
      <strong>{maybeQuantity}</strong> {renderParenthesizedInfo(match[2])}
    </span>
  )
  return ingredient
}

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
        Clear checkboxes
      </button>
      <ul>
        {ingredients.map((ingredient, i) => {
          const ingredientKey = `${i}-${ingredient}`
          const isChecked = !!checked[ingredientKey]
          return (
            <li
              className="flex flex-row items-center mb-2"
              key={ingredient + i.toString()}
            >
              <Checkbox
                className="mr-2"
                checked={isChecked}
                onChange={(e) => {
                  handleToggle(ingredientKey)
                }}
              />
              <span className={isChecked ? "text-gray-400" : ""}>
                {renderIngredient(ingredient)}
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
  let recipeData = await fs.readFile(
    path.join(process.cwd(), "recipes", slug, "index.yml"),
    "utf-8"
  )
  // Preconvert all fractions to their corresponding unicode characters
  recipeData = replaceFractionsWithUnicode(recipeData)

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
