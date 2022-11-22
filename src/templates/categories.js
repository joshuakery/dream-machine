import React from "react"
import PropTypes from "prop-types"
// Components
import { Link, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Window from '../components/StorageBin/window';

import casing from '../assets/svg/storageBin/casing.svg';
import titleContainer from '../assets/svg/storageBin/title-container.svg';
import buttonBackground from '../assets/svg/storageBin/item-button.svg';
import casingGradient from '../assets/svg/storageBin/bin-case-gradient.svg';

import * as styles from './categories.module.css'

const Categories = ({ pageContext, data }) => {
  const { category } = pageContext
  const { edges, totalCount } = data.allMdx
  console.log(data);
  const storageBinImage = getImage(data.storageBinImage)

  return (
    <div className={`${styles.bin} ${styles.background}`}>
      <div className={`${styles.casing}`} style={{ backgroundImage:`url(${casing})` }}>
          <div className={`${styles.titleContainer}`} style={{ backgroundImage:`url(${titleContainer})` }}>
              <h1 className={`${styles.title}`}>{category}</h1>
          </div>
          
          <Window>
              <GatsbyImage image={storageBinImage} alt={`the ${category} bin`} />
          </Window>

      </div>
      <div
          className={`${styles.buttonsContainer}`}
          style={{ backgroundImage:`url(${casingGradient})` }}
      >
          {edges && edges.map(edge => {
              const { slug } = edge.node;
              const { title } = edge.node.frontmatter;
              const featuredImage = getImage(edge.node.frontmatter.featuredImage)
              return (
                  <Link key={slug} to={`../../item/${slug}`}>
                      <div className={`${styles.button}`} style={{ backgroundImage:`url(${buttonBackground})` }}>
                          <GatsbyImage image={featuredImage} alt={`${title}`} />
                      </div>
                  </Link>
                  
              )
          })}
      </div>
      <div className={`${styles.bottom}`} style={{ backgroundImage:`url(${casing})` }}></div>
    </div>
  )
}
Categories.propTypes = {
  pageContext: PropTypes.shape({
    category: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
            }),
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
}
export default Categories
export const pageQuery = graphql`
  query($category: String) {
    allMdx(
      limit: 2000
      filter: { frontmatter: {categories: { in: [$category] } } }
    ) {
      totalCount
      edges {
        node {
          slug
          frontmatter {
            title
            featuredImage {
              childImageSharp {
                gatsbyImageData(
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]
                )
              }
            }
          }
        }
      }
    }
    storageBinImage: file(name: { eq: $category }) {
      childImageSharp {
        gatsbyImageData(
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
        )
      }
    }
  }
`