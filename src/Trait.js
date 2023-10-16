const Trait = ({ trait, count, imageUrl }) => {
    return (
        <div className="trait">
            <img src={imageUrl} alt="trait" />
            <div className="trait-info"><b>{trait} <br /> {count}</b></div>
        </div>
    );
}

export default Trait;