import React from "react"
import { GetStaticProps } from "next"
import Link from "next/link"

import { getAllRecipes, Recipe } from "../data/recipes"

interface IndexProps {
  recipes: Recipe[]
}

const Index: React.FC<IndexProps> = ({ recipes }) => {
  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
          Welcome to My Kitchen
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          A collection of my favorite recipes, tested and loved
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {recipes.map((recipe) => (
          <Link
            href={`/recipes/${recipe.slug}`}
            key={recipe.slug}
            className="group"
          >
            <article className="h-full bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 dark:border-gray-700 hover:scale-[1.02]">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                {recipe.title}
              </h2>
              {recipe.description && (
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {recipe.description}
                </p>
              )}
              <div className="mt-4 flex items-center text-orange-600 dark:text-orange-400 font-semibold">
                <span>View Recipe</span>
                <svg
                  className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Index

export const getStaticProps: GetStaticProps = async () => {
  const { recipes } = await getAllRecipes()
  return { props: { recipes } }
}
