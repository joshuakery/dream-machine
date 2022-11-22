import React from "react"
import windowBackground from '../../assets/svg/window-background.svg';
import windowContents from '../../assets/svg/window-room.png';

import * as styles from './window.module.css'

const Window = props => {
    return (
    <div className={`${styles.windowBackground}`} style={{ backgroundImage:`url(${windowBackground})` }}>
        <div className={`${styles.window}`}>
            <img src={windowContents} />
        </div>
    </div>
    )
}

export default Window;