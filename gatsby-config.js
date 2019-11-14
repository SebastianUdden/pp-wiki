module.exports = {
  siteMetadata: {
    title: `Pillow Wiki`,
    description: `The pillow wiki`,
    author: `@SebastianUdden`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Pillow Wiki`,
        short_name: `Wiki`,
        start_url: `/`,
        background_color: `#121212`,
        theme_color: `#16242C`,
        display: `standalone`,
        icon: `src/images/rocket.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
  ],
}
