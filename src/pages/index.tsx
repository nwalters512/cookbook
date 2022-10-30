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
            <h2 className="text-2xl hover:text-pink-800 focus:text-pink-800">
              {recipe.title}
            </h2>
          </Link>
          {recipe.description && <p>{recipe.description}</p>}
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
