import Champion from "./Champion";
import { useState, useEffect } from "react";

const ChampionArray = ({ data, addChampion, dragChampion, traitsData }) => {
    const filterChampions = (champions) => {
        const championsWithTraits = champions.filter(champion => champion.traits.length > 0 && champion.cost <= 5);
        return Object.values(championsWithTraits);
    };

    const [sortedChampions, setSortedChampions] = useState(filterChampions(data));
    const [isSortedByName, setIsSortedByName] = useState(false);
    const [searchText, setSearchText] = useState("");

    const sortByName = () => {
        const sortedByName = [...sortedChampions].sort((a, b) => a.name.localeCompare(b.name));
        setSortedChampions(sortedByName);
        setIsSortedByName(true);
    };

    const sortByCost = () => {
        const sortedByCost = [...sortedChampions].sort((a, b) => a.cost - b.cost);
        setSortedChampions(sortedByCost);
        setIsSortedByName(false);
    };

    useEffect(() => {
        sortByName();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="champion-array">
            <div className="sort-champions">
                <input type="text" placeholder="Search champion..." maxLength={100} value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                <div className="sort-buttons">
                    {searchText && <button onClick={() => setSearchText("")} className="clear-search">✕</button>}
                    <button onClick={sortByName} className={isSortedByName ? "selected-button" : "button2"}>A-Z</button>
                    <button onClick={sortByCost} className={isSortedByName ? "button2" : "selected-button"}>Cost &darr;</button>
                </div>
            </div>
            <div className="champions">
                {sortedChampions.map((champion) => (
                    champion.traits.length > 0 &&
                    <Champion
                        key={champion.apiName}
                        name={champion.name}
                        url={champion.tileIcon}
                        cost={champion.cost}
                        traits={champion.traits}
                        opacity={champion.name.toLowerCase().includes(searchText.toLowerCase()) ? 1 : 0.2}
                        addChampion={addChampion}
                        dragChampion={dragChampion}
                        traitsData={traitsData}
                    />
                ))}
            </div>
        </div>
    );
}

export default ChampionArray;