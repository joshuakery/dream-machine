import React from "react"
import PropTypes from "prop-types"

// Utilities
import * as styles from "./index.module.css"

// Components
import { Helmet } from "react-helmet"
import { graphql } from "gatsby"

import MainMenu from '../components/Home/mainMenu';
import Window from '../components/Home/window';

import casing from '../assets/svg/home-casing.svg';
import casingTitle from '../assets/svg/title.svg';

const HomePage = ({
  data: {
    site: {
      siteMetadata: { title },
    }
  },
}) => (
  <div>
    <Helmet title={title} />
    <div>
      <div className={`${styles.home} ${styles.background}`}>
        <div className={`${styles.casing}`} style={{ backgroundImage:`url(${casing})` }}>
          <div className={`${styles.titleContainer}`}>
            <div
              className={`${styles.title}`}
              style={{ backgroundImage:`url(${casingTitle})` }}
            >
            </div>
          </div>
          
          <Window />
          <MainMenu />
        </div>
      </div>
    </div>
  </div>
)

HomePage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired,
        }).isRequired
      ),
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
    }),
  }),
}

export default HomePage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`