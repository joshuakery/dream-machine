import displayContainer from '../../assets/svg/item/item-views-display-container.svg';

const ViewOverview = props => {
    const { views, current } = props;
    const displays = [];
    for (let i=1; i<=views; i++) {
        displays.push(
            <div key={i} className={`viewsDisplay ${current===i && "current"}`} >
            </div>
        )
    }
    return (
        <div className="views-overview" style={{ backgroundImage:`url(${displayContainer})` }}>
            {displays}
        </div>
    )
}

export default ViewOverview;