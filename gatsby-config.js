require("dotenv").config()

module.exports = {
  pathPrefix: "/dream-machine",

  siteMetadata: {
    siteUrl: "https://joshuakery.github.io/dream-machine/",
    title: "DREAM MACHINE",
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-mdx",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-transformer-json",
    // {
    //   resolve: "gatsby-source-filesystem",
    //   options: {
    //     name: "audio",
    //     path: `${__dirname}/audio`,
    //   },
    //   __key: "audio",
    // },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/assets/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "mdx",
        path: `${__dirname}/mdx`,
      },
      __key: "mdx",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "box-json",
        path: `${__dirname}/box-json`,
      },
      __key: "box-json",
    },
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        typekit: {
          id: process.env.TYPEKIT_ID,
        },
      },
    },
  ],
};
