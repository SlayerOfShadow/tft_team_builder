import Hexagon from "./Hexagon";

const Board = ({ hexagons, updateBoardSwap, freeHexagon, setStars }) => {
    return (
        <div className="board">
            {hexagons.map((hexagon, index) => (
                <Hexagon 
                    key={index} 
                    position={index} 
                    imageUrl={hexagon.imageUrl} 
                    cost={hexagon.cost} 
                    updateBoardSwap={updateBoardSwap}
                    freeHexagon={freeHexagon}
                    stars={hexagon.stars} 
                    setStars={setStars}
                />
            ))}
        </div>
    );
};

export default Board;