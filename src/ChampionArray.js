import Champion from "./Champion";
import { useState, useEffect } from "react";

const ChampionArray = ({ data }) => {
    const [sortedData, setSortedData] = useState(data);
    const [isSortedByName, setIsSortedByName] = useState(false);
    const [searchText, setSearchText] = useState("");

    const sortByName = () => {
        const sortedByName = [...sortedData].sort((a, b) => a.name.localeCompare(b.name));
        setSortedData(sortedByName);
        setIsSortedByName(true);
    };

    const sortByCost = () => {
        const sortedByCost = [...sortedData].sort((a, b) => a.cost - b.cost);
        setSortedData(sortedByCost);
        setIsSortedByName(false);
    };

    const clearSearch = () => {
        setSearchText("");
    };

    useEffect(() => {
        sortByName();
    }, []);

    return (
        <div className="champion-array">
            <div className="sort-champions">
                <input type="text" placeholder="Search champion..." maxLength={100} value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                <div className="sort-buttons">
                    {searchText && <button onClick={clearSearch} className="clear-search-button">✕</button>}
                    <button onClick={sortByName} className={isSortedByName ? "selected-button" : ""}>A-Z</button>
                    <button onClick={sortByCost} className={isSortedByName ? "" : "selected-button"}>Cost &darr;</button>
                </div>
            </div>
            <div className="champions">
                {sortedData.map((champion) => (
                    champion.traits.length > 0 &&
                    <Champion
                        key={champion.apiName}
                        url={champion.squareIcon}
                        cost={champion.cost}
                        traits={champion.traits}
                        opacity={champion.name.toLowerCase().includes(searchText.toLowerCase()) ? 1 : 0.2} />
                ))}
            </div>
        </div>
    );
}

export default ChampionArray;