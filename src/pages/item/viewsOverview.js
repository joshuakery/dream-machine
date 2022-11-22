import * as React from 'react'
import displayContainer from '../../assets/svg/item/item-views-display-container.svg';

import * as styles from './viewsOverview.module.css';

const ViewOverview = props => {
    const { views, current } = props;
    const displays = [];
    for (let i=0; i<views; i++) {
        displays.push(
            <div key={i} className={`${styles.viewsDisplay} ${current===i && styles.current}`} >
            </div>
        )
    }
    return (
        <div className={`${styles.viewsOverview}`} style={{ backgroundImage:`url(${displayContainer})` }}>
            {displays}
        </div>
    )
}

export default ViewOverview;