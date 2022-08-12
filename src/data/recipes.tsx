import fs from "fs-extra"
import path from "path"
import yaml from "js-yaml"

export interface Recipe {
  slug: string
  title: string
  description?: string
  ingredients: string[]
  steps: string[]
  notes?: string[]
}

export interface RecipesBySlug {
  [slug: string]: Recipe
}

export interface RecipeData {
  recipes: Recipe[]
  recipesBySlug: RecipesBySlug
}

let cache: RecipeData = null

function getFractionUnicode(fraction: string): string | null {
  switch (fraction) {
    case "1/2":
      return "½"
    case "1/3":
      return "⅓"
    case "2/3":
      return "⅔"
    case "1/4":
      return "¼"
    case "3/4":
      return "¾"
    case "1/5":
      return "⅕"
    case "2/5":
      return "⅖"
    case "3/5":
      return "⅗"
    case "4/5":
      return "⅘"
    case "1/6":
      return "⅙"
    case "5/6":
      return "⅚"
    case "1/7":
      return "⅐"
    case "1/8":
      return "⅛"
    case "3/8":
      return "⅜"
    case "5/8":
      return "⅝"
    case "7/8":
      return "⅞"
    case "1/9":
      return "⅑"
    case "1/10":
      return "⅒"
    default:
      return null
  }
}

export function replaceFractionsWithUnicode(str: string): string {
  return str.replace(/\d+\/\d+/g, (fraction) => {
    return getFractionUnicode(fraction) || fraction
  })
}

export const getAllRecipes = async (): Promise<RecipeData> => {
  if (cache) return cache
  const recipes = await fs.readdir(path.join(process.cwd(), "recipes"))
  const recipeData = (
    await Promise.all(
      recipes.map(async (slug) => {
        let rawData = await fs.readFile(
          path.join(process.cwd(), "recipes", slug, "index.yml"),
          "utf-8"
        )

        // Preconvert all fractions to their corresponding unicode characters
        rawData = replaceFractionsWithUnicode(rawData)

        const parsedData = yaml.load(rawData) as Recipe
        return {
          ...parsedData,
          slug,
        }
      })
    )
  ).sort((a, b) => a.title.localeCompare(b.title))
  const recipesBySlug = recipeData.reduce(
    (acc, data) => ({
      ...acc,
      [data.slug]: data,
    }),
    {} as RecipesBySlug
  )
  cache = {
    recipes: recipeData,
    recipesBySlug,
  }
  return cache
}

export const getRecipeBySlug = async (slug: string): Promise<Recipe> => {
  const data = await getAllRecipes()
  return data.recipesBySlug[slug]
}
