const Traits = ({ traits }) => {
    const traitElements = Array.from(traits).map(([trait, count]) => (
        <div key={trait} className="trait">
            {trait} : {count}
        </div>
    ));

    return (
        <div className="traits">
            {traitElements.length > 0 ? traitElements : <div className="no-traits">⚠<br />No active trait</div>}
        </div>
    );
}

export default Traits;
