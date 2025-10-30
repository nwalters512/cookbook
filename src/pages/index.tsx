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
          <Link href={`/recipes/${recipe.slug}`}>
            <h2 className="text-2xl hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
              {recipe.title}
            </h2>
          </Link>
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
