import React from "react"
import PropTypes from "prop-types"

// Utilities
import * as styles from "./about.module.css"

// Components
import { Helmet } from "react-helmet"
import { graphql } from "gatsby"

import casing from '../assets/svg/home-casing.svg';
import casingTitle from '../assets/png/about.png';

import windowBackground from '../assets/svg/item/item-window-background.svg';
import window from '../assets/svg/item/item-window.svg';

import Navigation from '../components/Navigation/navigation';

const AboutPage = ({
    data: {
        site: {
            siteMetadata: { title },
        }
    },
}) => (
        <div>
            <Helmet title={title} />
            <div>
                < Navigation />

                <div className={`${styles.homeMargin}`}>
                <div className={`${styles.home} ${styles.background}`}>
                    
                    <div className={`${styles.casing}`} style={{ backgroundImage: `url(${casing})` }}>
                        <div className={`${styles.titleContainer}`}>
                            <div
                                className={`${styles.title}`}
                                style={{ backgroundImage: `url(${casingTitle})` }}
                            >
                            </div>
                        </div>

                        <div
                            className={`${styles.windowBackground}`}
                            style={{ backgroundImage: `url(${windowBackground})` }}
                        >
                            <div className={`${styles.window}`} style={{ backgroundImage: `url(${window})` }}>

                                <div className={`${styles.textContainer}`}>
                                    <p>
                                        Dream Machine is an archive of objects left behind from my cousins' eviction from their home. 
                                    </p>
                                    <p>
                                        It is a collection too valuable to throw away, but not precious enough to keep with them.
                                    </p>
                                    <p>
                                        These objects were stored in my mother's basement for 10 years.
                                    </p>
                                    <br></br>
                                    <br></br>
                                    <p className={`${styles.acknowledgements}`}>
                                        Thank you to Susan, Shawn, Tanya, Ashley, Chris, Jeremi, Cory and Gail for <nobr>your stories.</nobr>
                                    </p>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
                </div>
            </div>
        </div>
    )

AboutPage.propTypes = {
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

export default AboutPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`