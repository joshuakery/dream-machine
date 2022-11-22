import React from "react"
import { Link } from 'gatsby';

import boxSoupDefault from '../../assets/png/home-buttons/box-soup-default.png';
import boxSoupHover from '../../assets/png/home-buttons/box-soup-hover.png';
import boxSoupPressed from '../../assets/png/home-buttons/box-soup-pressed.png';
import boxShellsDefault from '../../assets/png/home-buttons/box-shells-default.png';
import boxShellsHover from '../../assets/png/home-buttons/box-shells-hover.png';
import boxShellsPressed from '../../assets/png/home-buttons/box-shells-pressed.png';
import boxShoesDefault from '../../assets/png/home-buttons/box-shoes-default.png';
import boxShoesHover from '../../assets/png/home-buttons/box-shoes-hover.png';
import boxShoesPressed from '../../assets/png/home-buttons/box-shoes-pressed.png';
import boxSimpsonDefault from '../../assets/png/home-buttons/box-simpson-default.png';
import boxSimpsonHover from '../../assets/png/home-buttons/box-simpson-hover.png';
import boxSimpsonPressed from '../../assets/png/home-buttons/box-simpson-pressed.png';

import aboutDefault from '../../assets/png/about-buttons/about-default.png';
import aboutHover from '../../assets/png/about-buttons/about-hover.png';
import aboutPressed from '../../assets/png/about-buttons/about-pressed.png';

import RandomButton from "./randomButton";

import * as styles from './mainMenu.module.css';

const MainMenu = props => {
    return (
    <div>
      <div className={`${styles.buttonsContainer}`}>
        {/* bins row 1 */}
        {/* <div className={`${styles.buttonsRow}`}>
            <Link className={`${styles.button} ${styles.box1}`} to={`/item/corkheels`}>
                <img
                    src={box1default}
                    onMouseOver={e => e.currentTarget.src=box1hover}
                    onMouseOut={e => e.currentTarget.src=box1default}
                    onMouseDown={e => e.currentTarget.src=box1focus}
                />
            </Link>
            <Link className={`${styles.button} ${styles.box2}`} to={`/item/bartsimpsoncakepan`}>
                <img
                        src={box2default}
                        onMouseOver={e => e.currentTarget.src=box2hover}
                        onMouseOut={e => e.currentTarget.src=box2default}
                        onMouseDown={e => e.currentTarget.src=box2focus}
                    />
            </Link>
            <Link className={`${styles.button} ${styles.box3}`}to={`/item/chickensoupforthechristianfamilysoul`}>
                <img
                        src={box3default}
                        onMouseOver={e => e.currentTarget.src=box3hover}
                        onMouseOut={e => e.currentTarget.src=box3default}
                        onMouseDown={e => e.currentTarget.src=box3focus}
                    />
            </Link>
            <Link className={`${styles.button} ${styles.box4}`} to={`/item/seashellsbox`}>
                <img
                        src={box4default}
                        onMouseOver={e => e.currentTarget.src=box4hover}
                        onMouseOut={e => e.currentTarget.src=box4default}
                        onMouseDown={e => e.currentTarget.src=box4focus}
                    />
            </Link>          
        </div> */}
        {/* bins row 2 */}
        {/* <div className={`${styles.buttonsRow}`}>
            <Link className={`${styles.button} ${styles.books}`} to={`/categories/books`}>
                <img src={books} />
            </Link>
            <Link className={`${styles.button} ${styles.christmas}`} to={`/categories/christmas`}>
                <img src={christmas} />
            </Link>
            <Link className={`${styles.button} ${styles.kitchen}`} to={`/categories/kitchen`}>
                <img src={kitchen} />
            </Link>
        </div> */}

        {/* boxes */}
        <div className={`${styles.buttonsQuad}`}>

            <div className={`${styles.buttonsQuadArc}`}>

                <Link className={`${styles.button} ${styles.gamesLeft}`} to={`/item/seashellsbox`}>
                            <img
                                src={boxShellsDefault}
                                onMouseOver={e => e.currentTarget.src = boxShellsHover}
                                onMouseOut={e => e.currentTarget.src = boxShellsDefault}
                                onMouseDown={e => e.currentTarget.src = boxShellsPressed}
                            />
                </Link>

                <Link className={`${styles.button} ${styles.glass}`} to={`/item/bartsimpsoncakepan`}>
                            <img
                                src={boxSimpsonDefault}
                                onMouseOver={e => e.currentTarget.src = boxSimpsonHover}
                                onMouseOut={e => e.currentTarget.src = boxSimpsonDefault}
                                onMouseDown={e => e.currentTarget.src = boxSimpsonPressed}
                            />
                </Link>
                <Link className={`${styles.button} ${styles.gamesRight}`} to={`/item/chickensoupforthechristianfamilysoul`}>
                            <img
                                src={boxSoupDefault}
                                onMouseOver={e => e.currentTarget.src = boxSoupHover}
                                onMouseOut={e => e.currentTarget.src = boxSoupDefault}
                                onMouseDown={e => e.currentTarget.src = boxSoupPressed}
                            />
                </Link>
            </div>

            <div className={`${styles.button} ${styles.shoes}`}>
                <img
                    src={boxShoesDefault}
                />
                <Link to={`/item/corkheels`} className={`${styles.shoesExtensionLeft}`}>
                    <div
                        onMouseOver={e => e.currentTarget.parentNode.parentNode.firstChild.src = boxShoesHover}
                        onMouseOut={e => e.currentTarget.parentNode.parentNode.firstChild.src = boxShoesDefault}
                        onMouseDown={e => e.currentTarget.parentNode.parentNode.firstChild.src = boxShoesPressed}
                        style={{height:'100%'}}
                    >
                        <img />
                    </div>
                </Link>
                <Link to={`/item/corkheels`} className={`${styles.shoesExtensionCenter}`}>
                    <div
                        onMouseOver={e => e.currentTarget.parentNode.parentNode.firstChild.src = boxShoesHover}
                        onMouseOut={e => e.currentTarget.parentNode.parentNode.firstChild.src = boxShoesDefault}
                        onMouseDown={e => e.currentTarget.parentNode.parentNode.firstChild.src = boxShoesPressed}
                        style={{height:'100%'}}
                    >
                        <img />     
                    </div>
                </Link>
                <Link to={`/item/corkheels`} className={`${styles.shoesExtensionRight}`}>
                    <div
                        onMouseOver={e => e.currentTarget.parentNode.parentNode.firstChild.src = boxShoesHover}
                        onMouseOut={e => e.currentTarget.parentNode.parentNode.firstChild.src = boxShoesDefault}
                        onMouseDown={e => e.currentTarget.parentNode.parentNode.firstChild.src = boxShoesPressed}
                        style={{height:'100%'}}
                    >
                        <img />
                    </div>
                </Link>
            </div>


        </div>

        {/* bags */}
        {/* <Link className={`${styles.button} ${styles.clothesLeft}`} to={`/categories/clothes-left`}>
             <img src={clothesLeft} />
        </Link> */}
        <RandomButton />
        {/* <Link className={`${styles.button} ${styles.clothesRight}`} to={`/categories/clothes-right`}>
            <img src={clothesRight} />
        </Link> */}

                <br></br>

        <Link className={`${styles.button} ${styles.clothesCenter} ${styles.aboutButton}`} to={`/about`}>
            <img
                src={aboutDefault}
                onMouseOver={e => e.currentTarget.src = aboutHover}
                onMouseOut={e => e.currentTarget.src = aboutDefault}
                onMouseDown={e => e.currentTarget.src = aboutPressed}
            />
        </Link>

      </div>
    </div>
    )
}

export default MainMenu;