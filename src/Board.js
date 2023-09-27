import Hexagon from "./Hexagon";

const Board = () => {
    const hexagonArray = new Array(28).fill(null);

    return (
        <div className="board">
            {hexagonArray.map((_, index) => (
                <Hexagon key={index} position={index} imageUrl={""} cost={0} traits={[]} />
            ))}
        </div>
    );
};

export default Board;