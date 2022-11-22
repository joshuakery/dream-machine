import * as React from 'react'
import windowBackground from '../../assets/svg/item/item-window-background.svg';
import window from '../../assets/svg/item/item-window.svg';

import * as styles from './window.module.css';

const Window = props => {
    return (
    <div className={`${styles.windowBackground}`} style={{ backgroundImage:`url(${windowBackground})` }}>
        <div className={`${styles.window}`} style={{ backgroundImage:`url(${window})` }}>
            {props.children}
        </div>
    </div>
    )
}

export default Window;