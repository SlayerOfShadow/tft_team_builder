import { useEffect, useState } from "react";

const Hexagon = ({ position, imageUrl, cost, freeHexagon, stars, setStars }) => {
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
                <div className="hexagon-image" position={position}>
                    {imageUrl && <img src={imageUrl} alt="" onClick={handleChampionClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}/>}
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
        </div>
    );
}

export default Hexagon;