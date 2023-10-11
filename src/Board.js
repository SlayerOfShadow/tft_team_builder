import Hexagon from "./Hexagon";

const Board = ({ hexagons, freeHexagon }) => {
    return (
        <div className="board">
            {hexagons.map((hexagon, index) => (
                <Hexagon key={index} position={index} imageUrl={hexagon.imageUrl} cost={hexagon.cost} traits={hexagon.traits} freeHexagon={freeHexagon} />
            ))}
        </div>
    );
};

export default Board;