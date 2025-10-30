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
  <h2 className="text-2xl font-bold mt-8 mb-4 uppercase text-orange-600 dark:text-orange-400 border-b-2 border-orange-200 dark:border-orange-800 pb-2">
    {children}
  </h2>
)

const NUMBER = "\\d+(?:\\.\\d+)?"
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
  "piece",
  "pieces",
  "sprig",
  "sprigs",
].join("|")
// We allow for parenthesized info in between the quantity and units.
// This is useful for things like "2 (15oz) cans of chickpeas".
const QUANTITY_AND_UNITS = new RegExp(
  `(${QUANTITY}?\\s*(?:\\([^\)]*\\)\\s*)?(?:(?:${UNITS})\\s+)*)?(.*)`,
  "i"
)

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
        "text-gray-500 dark:text-gray-400": c.startsWith("("),
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
      <strong>{renderParenthesizedInfo(maybeQuantity)}</strong>{" "}
      {renderParenthesizedInfo(match[2])}
    </span>
  )
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
    <div className="max-w-4xl mx-auto">
      <SEO title={title} description={description} />
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          {title}
        </h1>
        {description && (
          <blockquote className="text-lg text-gray-600 dark:text-gray-300 italic border-l-4 border-orange-500 pl-4 py-2">
            {description}
          </blockquote>
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
        <SectionTitle>Ingredients</SectionTitle>
        <button
          className="mb-4 px-4 py-2 bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors shadow-sm"
          onClick={() => clearChecked()}
        >
          Clear checkboxes
        </button>
        <ul className="space-y-3">
          {ingredients.map((ingredient, i) => {
            const ingredientKey = `${i}-${ingredient}`
            const isChecked = !!checked[ingredientKey]
            return (
              <li
                className="group hover:bg-orange-50 dark:hover:bg-gray-700 rounded-lg p-2 transition-colors"
                key={ingredient + i.toString()}
              >
                <label className="flex flex-row items-center cursor-pointer">
                  <Checkbox
                    className="mr-3"
                    checked={isChecked}
                    onChange={(e) => {
                      handleToggle(ingredientKey)
                    }}
                  />
                  <span
                    className={
                      isChecked
                        ? "text-gray-400 dark:text-gray-500 line-through"
                        : "text-gray-800 dark:text-gray-200"
                    }
                  >
                    {renderIngredient(ingredient)}
                  </span>
                </label>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
        <SectionTitle>Directions</SectionTitle>
        <ol className="step-list space-y-6">
          {steps.map((step, i) => (
            <li
              className="step text-gray-800 dark:text-gray-200 leading-relaxed"
              key={step}
            >
              {step}
            </li>
          ))}
        </ol>
      </div>

      {notes && (
        <div className="bg-orange-50 dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <SectionTitle>Notes</SectionTitle>
          <ul className="list-dash text-gray-700 dark:text-gray-300 space-y-2">
            {notes.map((note) => (
              <li key={note} className="italic">
                {note}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
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
