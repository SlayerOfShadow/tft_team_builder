const Champion = ({ url, cost, traits, opacity, updateBoard, updateBoardIndex }) => {
    const imageUrl = "https://raw.communitydragon.org/latest/game/" + url.toLowerCase().replace(".tex", ".png");

    const borderStyle = {
        border: "1px solid",
    };

    switch (cost) {
        case 1:
            borderStyle.borderColor = "grey";
            break;
        case 2:
            borderStyle.borderColor = "#009600";
            break;
        case 3:
            borderStyle.borderColor = "#1E82FF";
            break;
        case 4:
            borderStyle.borderColor = "#C800C8";
            break;
        case 5:
            borderStyle.borderColor = "#FFC800";
            break;
        default:
            break;
    }

    const handleChampionClick = () => {
        updateBoard(imageUrl, cost, traits);
    };

    const handleOnDragEnd = (event) => {
        const x = event.clientX;
        const y = event.clientY;
    
        const elementAtDragEnd = document.elementFromPoint(x, y);
    
        if (elementAtDragEnd) {
            const positionValue = elementAtDragEnd.getAttribute("position");
            if (positionValue)
            {
                updateBoardIndex(positionValue, imageUrl, cost, traits);
            }
        }
    };

    return (
        <div className="champion-card" style={{ opacity: opacity }} >
            <img
                src={imageUrl} 
                alt="champion-icon" 
                type="Champion" 
                style={borderStyle} 
                onClick={handleChampionClick}
                onDragEnd={handleOnDragEnd}
            />
        </div>
    );
}

export default Champion;