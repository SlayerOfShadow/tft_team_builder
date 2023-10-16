const Trait = ({ trait, count }) => {
    return (
        <div key={trait} className="trait">
            <img src="" alt="trait-image" />
            <div>{trait} <br /> {count}</div>
        </div>
    );
}

export default Trait;