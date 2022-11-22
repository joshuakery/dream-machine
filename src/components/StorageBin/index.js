import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

import casing from '../../assets/svg/storageBin/casing.svg';
import titleContainer from '../../assets/svg/storageBin/title-container.svg';
import buttonBackground from '../../assets/svg/storageBin/item-button.svg';
import casingGradient from '../../assets/svg/storageBin/bin-case-gradient.svg';

import Window from './window';
 
const StorageBinPage = (props) => {
    const { match, archive } = props;
    const { storageBinID } = match.params;
    const storageBin = archive[storageBinID];
    return (
        <div className="bin background">
            <div className="casing" style={{ backgroundImage:`url(${casing})` }}>
                <div className="titleContainer" style={{ backgroundImage:`url(${titleContainer})` }}>
                    <h1 className="title">{storageBin.name}</h1>
                </div>
                
                <Window>
                    <img className="bin-window" src={`/img/storageBin/bin-${storageBinID}.png`}/>
                </Window>

            </div>
            <div
                className="buttons-container"
                style={{ backgroundImage:`url(${casingGradient})` }}
            >
                {storageBin.items && Object.keys(storageBin.items).map(itemID => {
                    const item = storageBin.items[itemID];
                    return (
                        <Link to={`${ROUTES.ITEM}/${storageBinID}/${itemID}`}>
                            <div className="bin-button" style={{ backgroundImage:`url(${buttonBackground})` }}>
                                <img src={`/img/item/${storageBinID}/${itemID}-view1.png`}/>
                            </div>
                        </Link>
                        
                    )
                })}
            </div>
            <div className="bottom" style={{ backgroundImage:`url(${casing})` }}></div>
        </div>
    )
};
 
export default StorageBinPage;