import React from "react"
import { GetStaticProps } from "next"
import Link from "next/link"

import { getAllRecipes, Recipe } from "../data/recipes"

interface IndexProps {
  recipes: Recipe[]
}

const Index: React.FC<IndexProps> = ({ recipes }) => {
  return (
    <React.Fragment>
      {recipes.map((recipe) => (
        <article className="mb-4" key={recipe.slug}>
          <h2 className="text-2xl">
            {recipe.url ? (
              <a
                href={recipe.url}
                className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
              >
                {recipe.title}
              </a>
            ) : (
              <Link
                href={`/recipes/${recipe.slug}`}
                className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
              >
                {recipe.title}
              </Link>
            )}
            {recipe.domain && (
              <span className="text-sm text-gray-500 dark:text-gray-500 ml-2">
                ({recipe.domain})
              </span>
            )}
          </h2>
          {recipe.description && (
            <p className="text-gray-600 dark:text-gray-400">
              {recipe.description}
            </p>
          )}
        </article>
      ))}
    </React.Fragment>
  )
}

export default Index

export const getStaticProps: GetStaticProps = async () => {
  const { recipes } = await getAllRecipes()
  return { props: { recipes } }
}
