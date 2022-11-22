import React, { Component } from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Navigation from '../components/Navigation/navigation';

import casing from '../assets/svg/box/box-casing.svg';
import titleContainer from '../assets/svg/storageBin/title-container.svg';
import smallWindow from '../assets/svg/item2/item-small-window.svg';


import * as styles from "../templates/box-page.module.css"

class BoxPage extends Component {
  constructor(props) {
      super(props);
  }

  render() {
      const { title, startingItems } = this.props.data.boxJson;
      return (
      <div className={`${styles.background}`}>
        <Navigation />
        <div className={`${styles.casing}`} style={{ backgroundImage:`url(${casing})` }}>
          <div className={`${styles.titleContainer}`} style={{ backgroundImage:`url(${titleContainer})` }}>
              <h1 className={`${styles.title}`}>{title}</h1>
          </div>
          <div
              className={`${styles.buttonsContainer}`}
          >
            {startingItems.map(item => {
              const { slug } = item;
              const { title } = item.frontmatter;
              const featuredImage = getImage(item.frontmatter.featuredImage);
              return (
                <Link key={slug} to={`../../item/${slug}`}>
                    <div
                      className={`${styles.smallWindow} ${styles.nextItem}`}
                      style={{ backgroundImage:`url(${smallWindow})` }}
                    >
                        <GatsbyImage image={featuredImage} alt={`${title}`} />
                    </div>
                </Link>
              )
            })
            }
          </div>
        </div>

        {/* <div className={`${styles.bottom}`} style={{ backgroundImage:`url(${casing})` }}></div> */}
      </div>
      )
  }
}

export const query = graphql`
  query ($id: String) {
    boxJson: boxJsonJson(id: {eq: $id}) {
        title
        startingItems {
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
`

export default BoxPage