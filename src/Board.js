import Hexagon from "./Hexagon";

const Board = () => {
    const hexagonArray = new Array(28).fill(null);

    return (
        <div className="board">
            {hexagonArray.map((_, index) => (
                <Hexagon position={index} />
            ))}
        </div>
    );
};

export default Board;