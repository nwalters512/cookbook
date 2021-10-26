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

export const getAllRecipes = async (): Promise<RecipeData> => {
  if (cache) return cache
  const recipes = await fs.readdir(path.join(process.cwd(), "recipes"))
  const recipeData = (
    await Promise.all(
      recipes.map(async (slug) => {
        const rawData = await fs.readFile(
          path.join(process.cwd(), "recipes", slug, "index.yml"),
          "utf-8"
        )
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
