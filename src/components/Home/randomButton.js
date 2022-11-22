import React from "react"
import { Link } from 'gatsby';
import { StaticQuery, graphql } from "gatsby"

import boxAnyDefault from '../../assets/png/home-buttons/box-any-default.png';
import boxAnyHover from '../../assets/png/home-buttons/box-any-hover.png';
import boxAnyPressed from '../../assets/png/home-buttons/box-any-pressed.png';

import * as styles from './randomButton.module.css';

const ChooseRandomSlugFromEdges = edges => {
    const randomElement = edges[Math.floor(Math.random() * edges.length)];
    return randomElement.node.slug;
}

const RandomButton = () => {
    return (
    <StaticQuery
        query={graphql`
            query {
                allMdx {
                    edges {
                        node {
                            slug
                        }
                    }
                }
            }
        `
        }
        render={data => (
            <Link
                className={`${styles.button} ${styles.clothesCenter}`}
                to={`/item/${ChooseRandomSlugFromEdges(data.allMdx.edges)}`}
            >
                <img
                    src={boxAnyDefault}
                    onMouseOver={e => e.currentTarget.src = boxAnyHover}
                    onMouseOut={e => e.currentTarget.src = boxAnyDefault}
                    onMouseDown={e => e.currentTarget.src = boxAnyPressed}
                />
            </Link>
        )}
      />

    )
}

export default RandomButton;