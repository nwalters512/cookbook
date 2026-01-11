import fs from "fs-extra"
import path from "path"
import yaml from "js-yaml"

export interface Recipe {
  slug: string
  title: string
  description?: string
  url?: string // If present, recipe is external
  domain?: string // Extracted domain for external recipes
  ingredients: string[]
  steps: string[]
  notes?: string[]
}

function getDomain(url: string): string {
  const hostname = new URL(url).hostname
  return hostname.replace(/^www\./, "")
}

export interface RecipesBySlug {
  [slug: string]: Recipe
}

export interface RecipeData {
  recipes: Recipe[]
  recipesBySlug: RecipesBySlug
}

interface ExternalRecipeYaml {
  title: string
  url: string
  description?: string
}

async function getExternalRecipes(): Promise<Recipe[]> {
  const externalPath = path.join(process.cwd(), "recipes", "external.yml")
  if (!(await fs.pathExists(externalPath))) return []

  const rawData = await fs.readFile(externalPath, "utf-8")
  const externalRecipes = yaml.load(rawData) as ExternalRecipeYaml[]

  if (!externalRecipes) return []

  return externalRecipes.map((recipe) => ({
    slug: recipe.title.toLowerCase().replace(/\s+/g, "-"),
    title: recipe.title,
    url: recipe.url,
    domain: getDomain(recipe.url),
    description: recipe.description ?? null,
    ingredients: [],
    steps: [],
  }))
}

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
  // Load local recipes from directories
  const recipeDirs = await fs.readdir(path.join(process.cwd(), "recipes"))
  const localRecipes = await Promise.all(
    recipeDirs
      .filter((name) => !name.endsWith(".yml")) // Skip external.yml
      .map(async (slug) => {
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

  // Load external recipes
  const externalRecipes = await getExternalRecipes()

  // Merge and sort all recipes alphabetically
  const allRecipes = [...localRecipes, ...externalRecipes].sort((a, b) =>
    a.title.localeCompare(b.title)
  )

  // Only local recipes have detail pages
  const recipesBySlug = localRecipes.reduce(
    (acc, data) => ({
      ...acc,
      [data.slug]: data,
    }),
    {} as RecipesBySlug
  )

  return {
    recipes: allRecipes,
    recipesBySlug,
  }
}

export const getRecipeBySlug = async (slug: string): Promise<Recipe> => {
  const data = await getAllRecipes()
  return data.recipesBySlug[slug]
}
