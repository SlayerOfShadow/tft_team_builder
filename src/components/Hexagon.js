import { useEffect, useState } from "react";

const Hexagon = ({ position, imageUrl, cost, updateBoardSwap, freeHexagon, stars, setStars, items }) => {
    const [showStars, setShowStars] = useState(false);

    const handleChampionClick = () => {
        freeHexagon(position);
    };

    const handleMouseEnter = () => {
        setShowStars(true);
      };
    
      const handleMouseLeave = () => {
        if (stars === false) setShowStars(false);
      };

    const handleStarsClick = () => {
        setStars(position, !stars);
    };

    const handleOnDragEnd = (event) => {
        const x = event.clientX;
        const y = event.clientY;
    
        const elementAtDragEnd = document.elementFromPoint(x, y);
    
        if (elementAtDragEnd) {
            const positionValue = elementAtDragEnd.getAttribute("position");
            if (positionValue)
            {
                updateBoardSwap(position, positionValue);
            }
        }
    };

    const allowDrop = (event) => {
        event.preventDefault();
      }

    useEffect(() => {
        if (cost === 0) {
            setShowStars(false);
        }
    }, [cost]);

    let marginLeft = 0;
    let starsMarginLeft = 0;
    let backgroundColor;

    if (position === 7 || position === 21) {
        marginLeft = 60;
        starsMarginLeft = 27.5;
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

    return (
        <div className="hexagon">
            <div className="hexagon-border" style={{ marginLeft: `${marginLeft}px`, backgroundColor }}>
                <div className="hexagon-image" position={position} onDragOver={allowDrop}>
                    {imageUrl && <img src={imageUrl} alt="" position={position} type="champion" onClick={handleChampionClick} onDragEnd={handleOnDragEnd} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}/>}
                </div>
            </div>
            {showStars && 
            <div className="stars" 
                style={{
                     marginLeft: `${starsMarginLeft}px`,
                     color: stars ? '#f1d25e' : '#565f8a',
                    }} 
                onClick={handleStarsClick} 
                onMouseEnter={handleMouseEnter} 
                onMouseLeave={handleMouseLeave}
                >★★★
            </div>}
            <div className="champion-items"
            style={{
                marginLeft: `${starsMarginLeft}px`,
               }} >
            {items.length > 0 &&
                items.map((url, index) => (
                    <img className="champion-item-icon" key={index} src={url} alt="champion-item-icon" />
                ))}
            </div>
        </div>
    );
}

export default Hexagon;