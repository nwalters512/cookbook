import React from "react"
import { GetStaticProps } from "next"
import Link from "next/link"

import { getAllRecipes, Recipe } from "../data/recipes"

interface IndexProps {
  recipes: Recipe[]
}

const Index: React.FC<IndexProps> = ({ recipes }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {recipes.map((recipe) => (
        <Link
          href={`/recipes/${recipe.slug}`}
          key={recipe.slug}
          className="group"
        >
          <article className="h-full bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 p-4 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
              {recipe.title}
            </h2>
            {recipe.description && (
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {recipe.description}
              </p>
            )}
          </article>
        </Link>
      ))}
    </div>
  )
}

export default Index

export const getStaticProps: GetStaticProps = async () => {
  const { recipes } = await getAllRecipes()
  return { props: { recipes } }
}
