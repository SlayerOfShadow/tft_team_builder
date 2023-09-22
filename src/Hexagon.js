const Hexagon = ({ position }) => {
    let marginLeft = 0;

    if (position === 7 || position === 21) {
        marginLeft = 55;
    }

    return (
        <div className="hexagon" style={{ marginLeft: `${marginLeft}px` }}></div>
    );
}

export default Hexagon;