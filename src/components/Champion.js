import { useState, useEffect, useRef } from "react";

const Champion = ({ name, url, cost, traits, opacity, addChampion, dragChampion, traitsIcons }) => {
    const [showInfo, setShowInfo] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const imageUrl = "https://raw.communitydragon.org/latest/game/" + url.toLowerCase().replace(/\.(tex|dds)$/, ".png");
    const goldIconUrl = "https://raw.communitydragon.org/13.18/game/assets/ux/tft/regionportals/icon/gold.tft_set9_stage2.png";

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

    const handleChampionOnDragStart = () => {
        setShowInfo(false);
        clearTimeout(timeoutIdRef.current);
    }

    const handleChampionOnDragEnd = (event) => {
        const x = event.clientX;
        const y = event.clientY;

        const elementAtDragEnd = document.elementFromPoint(x, y);

        if (elementAtDragEnd) {
            const positionValue = elementAtDragEnd.getAttribute("position");
            if (positionValue) {
                dragChampion(positionValue, imageUrl, cost, traits);
            }
        }
    };

    const timeoutIdRef = useRef();

    const handleMouseEnter = () => {
        timeoutIdRef.current = setTimeout(() => {
            setShowInfo(true);
        }, 500);
    };

    const handleMouseLeave = () => {
        clearTimeout(timeoutIdRef.current);
        setShowInfo(false);
    };

    const handleMouseMove = (event) => {
        setPosition({ x: event.clientX, y: event.clientY });
    };

    useEffect(() => {
        return () => {
            clearTimeout(timeoutIdRef.current);
        };
    }, []);

    return (
        <div
            className="champion-card"
            style={{ opacity: opacity }}
        >
            <img
                src={imageUrl}
                alt="champion-icon"
                type="Champion"
                style={borderStyle}
                onClick={() => addChampion(imageUrl, cost, traits)}
                onDragStart={handleChampionOnDragStart}
                onDragEnd={handleChampionOnDragEnd}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}
            />
            {showInfo && (
                <div className="champion-info" style={{ position: 'fixed', bottom: window.innerHeight - position.y, right: window.innerWidth - position.x}}>
                    <div className="champion-info-img">
                        <img 
                            src={imageUrl}
                            alt="champion-icon"
                        />
                        <p>{name}</p>
                    </div>
                    <div className="champion-info-traits">
                        {traits.map((trait, index) => (
                            <div className="champion-info-trait" key={index}>
                                <img 
                                    src={traitsIcons.get(trait)}
                                    alt="trait-icon"
                                />
                                <div>{trait}</div>
                            </div>
                        ))}
                    </div>
                    <div className="champion-info-cost">
                        {cost}
                        <img src={goldIconUrl} alt="gold-icon" />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Champion;