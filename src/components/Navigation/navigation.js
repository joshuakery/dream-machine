import React from "react"
import { Link } from "gatsby"

import homeButtonDefault from '../../assets/svg/nav/home-button-default.svg';
import homeButtonHover from '../../assets/svg/nav/home-button-hover.svg';
import homeButtonFocus from '../../assets/svg/nav/home-button-focus.svg';
import boxButtonDefault from '../../assets/svg/nav/box-button-default.svg';
import boxButtonHover from '../../assets/svg/nav/box-button-hover.svg';
import boxButtonFocus from '../../assets/svg/nav/box-button-focus.svg';

import titleContainer from '../../assets/svg/storageBin/title-container.svg';

import * as styles from './navigation.module.css';

const _ = require("lodash")

const Navigation = props => {
    const { box } = props;
    return (
    <div>
        <Link to={`/`}>
            {/* <div
            className={`${styles.homeButton}`}
            style={{ backgroundImage:`url(${homeButton})` }}
            >
            </div> */}
            <img
                className={`${styles.homeButton}`}
                src={homeButtonDefault}
                onMouseOver={e => e.currentTarget.src=homeButtonHover}
                onMouseOut={e => e.currentTarget.src=homeButtonDefault}
                onMouseDown={e => e.currentTarget.src=homeButtonFocus}
            />
        </Link>
        {box &&
        <Link to={`/box/${_.kebabCase(box)}`} className={`${styles.boxButtonLink}`}>
          <div
                className={`${styles.boxButton}`}
                onMouseOver={e => e.currentTarget.firstChild.src=boxButtonHover}
                onMouseOut={e => e.currentTarget.firstChild.src=boxButtonDefault}
                onMouseDown={e => e.currentTarget.firstChild.src=boxButtonFocus}
            >
            <img
                src={boxButtonDefault}
            />
              <h1 className={`${styles.boxButtonTitle}`}>{box}</h1>
          </div>
        </Link>
        }
    </div>

    )
}

export default Navigation;