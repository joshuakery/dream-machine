import React, { Component } from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Navigation from '../components/Navigation/navigation';

import * as styles from "../templates/item-page.module.css"

import shortTitle from '../assets/svg/short-title.svg';

import casing from '../assets/svg/item2/item-casing.svg';
import windowBackground from '../assets/svg/item/item-window-background.svg';
import window from '../assets/svg/item/item-window.svg';
import smallWindow from '../assets/svg/item2/item-small-window.svg';

import SoundPlayer from '../pages/item/sound-player';

import RandomButton from "../components/Home/randomButton";

class ItemPage extends Component {
  constructor(props) {
      super(props);

      this.state = {
          view: 0,
          audioLoaded: false,
          fadeOut: false,
          fadeIn: false,
      }
  }

  componentDidMount() {
      this.setState({
          view: 0,
          audioLoaded: false,
          fadeOut: false,
          fadeIn: false,
      });
  }

  onSwitchTo = i => {
    this.setState({ view:i });
  }

  onSwitchToNext = () => {
    const { views } = this.props.data.mdx.frontmatter;
    const { view } = this.state;
    this.onSwitchTo((view+1)%views.length);
  }

  addFadeOutClass = () => {
      this.setState({ fadeOut:true });
  }

  addFadeInClass = () => {
    this.setState({ fadeIn:true });
  }

  setAudioLoaded = () => {
    this.setState({ audioLoaded:true });
  }

  getViews = () => {
    const { title, views } = this.props.data.mdx.frontmatter;
    const { view } = this.state;

    const display = [];
    for (let i=0; i<views.length; i++) {
      if (i >= 4) continue;
      display.push(
        <div
            className={`${styles.viewsImage} ${i===view && styles.currentView}`}
            onClick={() => this.onSwitchTo(i)}
            key={i}
        >
          <GatsbyImage
            image={getImage(views[i])}
            alt={`${title}: View #${i}`}
          />
        </div>
      );
    }

    return display;
  }

  getPrevItems = () => {
    return this.props.location.state && this.props.location.state.prevItems ?
    this.props.location.state.prevItems :
    [];
  }

  getPrevItem = () => {
    const prevItems = this.getPrevItems();

    const possiblePrevItems = this.props.data.allMdx.edges;

    if (prevItems.length <= 1) {
        return possiblePrevItems[0].node;
    }
    else {
        const prevItem = possiblePrevItems.filter(item => {
            return item.node.slug === prevItems[prevItems.length - 1];
        });
        return prevItem[0].node;
    }

  }



  getPrevItemDisplay = () => {
      const prevItem = this.getPrevItem();

      const prevItems = this.getPrevItems();
      const isFirstItemWithPreviousItems = prevItems.length == 1;
      
      return (
        <Link
            to={`/item/${prevItem.slug}`}
            className={`
              ${styles.smallWindow}
              ${styles.previousItem}
              ${isFirstItemWithPreviousItems && styles.shrinkIn}
            `}
            style={{ backgroundImage:`url(${smallWindow})` }}
        >
          <div
            className={`
              ${styles.smallWindowImageWrapper}
              ${(this.state.fadeIn || isFirstItemWithPreviousItems) && styles.fadeIn}
              ${(isFirstItemWithPreviousItems) && styles.reducedDelay}
              ${this.state.fadeOut && styles.fadeOut}
            `}
          >
            <GatsbyImage
                image={getImage(prevItem.frontmatter.featuredImage)}
                alt={`Return to ${prevItem.frontmatter.title}`}

            />
          </div>

        </Link>
      )
  }

  render() {
      const { title,
              views,
              audio,
              nextItem,
              nextItems,
              box
            } = this.props.data.mdx.frontmatter;
      const { view, audioLoaded } = this.state;

      const prevItems = this.props.location.state && this.props.location.state.prevItems ?
        this.props.location.state.prevItems :
        [];
      const possiblePrevItems = this.props.data.allMdx.edges;

      const doHide = prevItems.length == 0 && audio != null && !audioLoaded;

      return (
      <div className={`${styles.background}`}>

              <Navigation />

              <div className={`${styles.headerTitle}`}>
                  <div
                      style={{ backgroundImage: `url(${shortTitle})` }}
                  >
                  </div>
              </div>

          <div className={`${styles.casing}`} style={{ backgroundImage:`url(${casing})` }}>

            {this.props.data.allMdx.edges.length > 0 &&
            this.getPrevItemDisplay()
            }

            <div
              className={`${styles.windowBackground}`}
              style={{ backgroundImage:`url(${windowBackground})` }}
            >
                <div className={`${styles.window}`} style={{ backgroundImage:`url(${window})` }}>

                <div
                  className={`${styles.mainImage}
                              ${this.state.fadeIn && styles.fadeIn}
                              ${this.state.fadeOut && styles.fadeOut}
                            `}
                >
                  <div className={`${styles.mainImageImageWrapper}`}>
                    <GatsbyImage
                      image={getImage(views[view])}
                      alt={`${title}: View #${view}`}
                      className={` ${ (doHide) && styles.hide} `}
                    />
                  </div>
                </div>

                {views.length > 1 &&
                    <div
                      className={`
                        ${styles.viewsDisplay}
                        ${this.state.fadeIn && styles.fadeIn}
                        ${this.state.fadeOut && styles.fadeOut}
                        ${ (doHide) && styles.hide}
                      `}>
                    {this.getViews()}
                    </div>
                }

                </div>
            </div>

            {nextItems && nextItems.length > 0 &&
            <div className={`${styles.nextItems}`} >
                {nextItems.map(item => (
                <Link
                    key={item.slug}
                    to={`/item/${item.slug}`}
                    className={`${styles.smallWindow} ${styles.nextItem}`}
                    style={{ backgroundImage:`url(${smallWindow})` }}
                >
                  <div
                    className={`
                      ${styles.smallWindowImageWrapper}
                      ${this.state.fadeIn && styles.fadeIn}
                      ${this.state.fadeOut && styles.fadeOut}
                      ${ (doHide) && styles.hide}
                    `}
                  >
                    <GatsbyImage
                        image={getImage(item.frontmatter.featuredImage)}
                        alt={`Go to ${item.frontmatter.title}`}
                    />
                  </div>
                </Link>
                ))}
            </div>
            }

            {(
              (!nextItems || nextItems.length == 0) &&
              this.getPrevItems().length > 0 &&
              audio
              ) &&
            <div className={`${styles.nextItems}`} >
                <div
                    className={`${styles.smallWindow} ${styles.nextItem} ${styles.shrinkOut}`}
                    style={{ backgroundImage:`url(${smallWindow})` }}
                >
                </div>
            </div>
            }

            {(!audio) &&
            <div className={`${styles.randomButtonContainer}`}>
              <RandomButton />
            </div>
            }

              
          </div>

          {audio &&
          <SoundPlayer
            slug={this.props.pageContext.slug}
            audio={audio}
            nextItem={nextItem}
            prevItems={prevItems}
            onSwitchToNext={this.onSwitchToNext}
            setAudioLoaded={this.setAudioLoaded}
            addFadeOutClass={this.addFadeOutClass}
            addFadeInClass={this.addFadeInClass}
            possiblePrevItems={possiblePrevItems}
          />
          }

      </div>
      )
  }
}

export const query = graphql`
  query ($id: String, $slug: String) {
    mdx(id: {eq: $id}) {
      frontmatter {
        title
        categories
        box
        featuredImage {
          childImageSharp {
            gatsbyImageData(
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
        views {
          childImageSharp {
            gatsbyImageData(
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
        audio
        nextItem
        nextItems {
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
      body
    }
    allMdx(filter: {frontmatter: {nextItem: {eq: $slug}}}) {
        edges {
          node {
            id
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
  }
`

export default ItemPage