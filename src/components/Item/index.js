import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import casing from '../../assets/svg/item/item-casing.svg';
import titleContainer from '../../assets/svg/item/item-bin-title-container.svg';
import titleImageContainer from '../../assets/svg/item/item-title-image-container.svg';
import nextButton from '../../assets/svg/item/item-next-button.svg';
import prevButton from '../../assets/svg/item/item-prev-button.svg';

import ViewsOverview from './viewsOverview';
import Window from './window';

import * as ROUTES from '../../constants/routes';
 
class ItemPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            view: 1,
        }
    }

    componentDidMount() {
        this.setState({
            view: 1
        });
    }

    switchView = dir => {
        const { archive, match } = this.props;
        const { storageBinID, itemID } = match.params;
        const item = archive[storageBinID].items[itemID];
        const currentView = this.state.view;
        let newView = this.state.view + dir;
        if (newView > item.views) newView = 1;
        else if (newView <= 0) newView = item.views;
        this.setState({ view:newView }); 
    }

    onNext = () => {
        this.switchView(1);
    }

    onPrev = () => {
        this.switchView(-1);
    }

    render() {
        const { archive, match } = this.props;
        const { storageBinID, itemID } = match.params;
        const item = archive[storageBinID].items[itemID];
        const { view } = this.state;
        return (
        <div className="item background">

            <div className="bin-link-container">
            <Link className="bin-link" to={`${ROUTES.STORAGEBIN}/${storageBinID}`}>
                <div className="bin-title-container" style={{ backgroundImage:`url(${titleContainer})` }}>
                    <div className="bin-title">
                        {storageBinID}
                    </div>
                </div>
            </Link>
            </div>

            <div className="casing" style={{ backgroundImage:`url(${casing})` }}>

     
                <div className="title-image-container" style={{ backgroundImage:`url(${titleImageContainer})` }}>
                    <img src={`/img/item/${storageBinID}/${itemID}-view1.png`} />
                </div>

                <Window>
                    <div className="title-container">
                        <h1 className="title">{item.name}</h1>
                    </div>
                    <img className="object" src={`/img/item/${storageBinID}/${itemID}-view${view}.png`}/>
                </Window>
                
                <div className="views-display-container">
                    
                    <button className="nav-button next-button" onClick={this.onPrev} disabled={item.views === 1}>
                        <img src={prevButton} />
                    </button>

                    <ViewsOverview views={item.views} current={view} />

                    <button className="nav-button prev-button" onClick={this.onNext} disabled={item.views === 1}>
                        <img src={nextButton} />
                    </button>
                    
                </div>

            </div>
        </div>
        )
    }
}
 
export default ItemPage;