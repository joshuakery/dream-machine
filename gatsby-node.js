const path = require("path")
const _ = require("lodash")

//https://www.gatsbyjs.com/docs/reference/graphql-data-layer/schema-customization/#foreign-key-fields
exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions
  const typeDefs = [
    "type Mdx implements Node { frontmatter: Frontmatter }",
    schema.buildObjectType({
      name: "Frontmatter",
      fields: {
        nextItems: {
          type: ["Mdx"],
          resolve: async (source, args, context, info) => {

            const { entries } = await context.nodeModel.findAll({
              query: {
                filter: { slug: { in: source.nextItem } }
              },
              type: "Mdx",
            });
            return entries;
          },
        },
      },
    }),
    schema.buildObjectType({
      name: "BoxJsonJson",
      fields: {
        startingItems: {
          type: ["Mdx"],
          resolve: async (source, args, context, info) => {

            const { entries } = await context.nodeModel.findAll({
              query: {
                filter: { slug: { in: source.startingItems } }
              },
              type: "Mdx",
            })
            return entries
          },
        },
      },
      interfaces: ["Node"],
    }),
  ]
  createTypes(typeDefs)
}

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const itemPageTemplate = path.resolve('src/templates/item-page.js')
  const categoryTemplate = path.resolve("src/templates/categories.js")
  const boxPageTemplate = path.resolve('src/templates/box-page.js')

  const result = await graphql(`
    {
      categoriesGroup: allMdx(limit: 2000) {
        group(field: frontmatter___categories) {
          fieldValue
        }
      }
      allMdx {
        edges {
          node {
            id
            slug
          }
        }
      }
      boxJson: allBoxJsonJson {
        edges {
          node {
            id
            title
          }
        }
      }
    }
  `)

  // handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }


  const allMdx = result.data.allMdx;

  // Make Item Pages
  allMdx.edges.forEach(async edge => {
    const { id, slug } = edge.node;
    createPage({
      path: `/item/${_.kebabCase(slug)}/`,
      component: itemPageTemplate,
      context: {
        id: id,
        slug: slug,
      },
    })

  });

  // Make Box Pages
  const boxJson = result.data.boxJson;

  boxJson.edges.forEach(async edge => {
    const { id, title } = edge.node;
    createPage({
      path: `/box/${_.kebabCase(title)}/`,
      component: boxPageTemplate,
      context: {
        id: id,
      },
    })

  });

  // Extract category data from query
  const categories = result.data.categoriesGroup.group

  // Make category pages
  categories.forEach(category => {
    createPage({
      path: `/categories/${_.kebabCase(category.fieldValue)}/`,
      component: categoryTemplate,
      context: {
        category: category.fieldValue,
      },
    })
  })
}