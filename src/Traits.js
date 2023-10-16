import Trait from "./Trait";

const Traits = ({ traits }) => {
    const activeTraits = Array.from(traits).map(([trait, count]) => (
        <Trait trait={trait} count={count} />
    ));

    return (
        <div className="traits">
            {activeTraits.length > 0 ? activeTraits : <div className="no-traits">⚠<br />No active trait</div>}
        </div>
    );
}

export default Traits;
