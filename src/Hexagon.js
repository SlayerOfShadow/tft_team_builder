const Hexagon = ({ position, imageUrl, cost, freeHexagon }) => {
    let marginLeft = 0;
    let backgroundColor;

    if (position === 7 || position === 21) {
        marginLeft = 60;
    }
    else {
        marginLeft = 5;
    }

    switch (cost) {
        case 1:
            backgroundColor = "grey";
            break;
        case 2:
            backgroundColor = "#009600";
            break;
        case 3:
            backgroundColor = "#1E82FF";
            break;
        case 4:
            backgroundColor = "#C800C8";
            break;
        case 5:
            backgroundColor = "#FFC800";
            break;
        default:
            backgroundColor = "#464c70";
            break;
    }

    const handleChampionClick = () => {
        freeHexagon(position);
    };

    return (
        <div className="hexagon-border" style={{ marginLeft: `${marginLeft}px`, backgroundColor }}>
            <div className="hexagon">
                {imageUrl && <img src={imageUrl} alt="" onClick={handleChampionClick} />}
            </div>
        </div>
    );
}

export default Hexagon;