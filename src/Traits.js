import Trait from "./Trait";

const Traits = ({ traits, traitsData }) => {
    const getImageUrl = (trait) => {
        return "https://raw.communitydragon.org/latest/game/" + traitsData.find(item => item.name === trait).icon.toLowerCase().replace(".tex", ".png");
    }

    const activeTraits = Array.from(traits).map(([trait, count]) => (
        <Trait key={trait} trait={trait} count={count} imageUrl={getImageUrl(trait)} />
    ));

    return (
        <div className="traits">
            {activeTraits.length > 0 ? activeTraits : <div className="no-traits">⚠<br /><b>No active trait</b></div>}
        </div>
    );
}

export default Traits;
