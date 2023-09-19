import Champion from "./Champion";

const ChampionArray = ({ data }) => {
    return (
        <div className="champion-array">
            <div className="sort-champions">
                <input type="text" placeholder="Search champion..." maxlength="15" />
                <div className="sort-buttons">
                    <button>A-Z</button>
                    <button>Cost &darr;</button>
                </div>
            </div>
            <div className="champions">
                {data.map((champion) => (
                    champion.traits.length > 0 && <Champion key={champion.id} url={champion.squareIcon} cost={champion.cost} />
                ))}
            </div>
        </div>
    );
}

export default ChampionArray;