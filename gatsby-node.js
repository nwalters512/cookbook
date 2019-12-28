/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type !== 'Recipe') return;
  console.log(node);
  const fileNode = getNode(node.parent);
  const slug = createFilePath({ node, getNode, basePath: 'recipes' });
  console.log(fileNode);
  console.log(slug);
  console.log('======');
  createNodeField({
    node,
    name: 'slug',
    value: `/recipes${slug}`,
  });
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query {
      allRecipe {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `);
  console.log(JSON.stringify(result, null, 2));
  result.data.allRecipe.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/recipe.js`),
      context: {
        slug: node.fields.slug,
      }
    });
  });
}
