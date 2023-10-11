import useFetch from "./useFetch";
import ChampionArray from "./ChampionArray";
import Board from "./Board";
import { useState } from "react";

const Body = () => {
    const { data, isPending, error } = useFetch("https://raw.communitydragon.org/13.18/cdragon/tft/en_us.json");
    const [hexagons, setHexagons] = useState(new Array(28).fill({ imageUrl: "", cost: 0, traits: [] }));

    const filterUniqueChampions = (champions) => {
        const uniqueChampions = {};
        champions.forEach((champion) => {
            uniqueChampions[champion.characterName] = champion;
        });
        return Object.values(uniqueChampions);
    };

    const updateHexagon = (imageUrl, cost, traits) => {
        const updatedHexagons = [...hexagons];
        const index = hexagons.findIndex(hexagon => hexagon.cost === 0);
        updatedHexagons[index] = { imageUrl, cost, traits };
        setHexagons(updatedHexagons);
    };

    const freeHexagon = (index) => {
        const updatedHexagons = [...hexagons];
        updatedHexagons[index] = { imageUrl: "", cost: 0, traits: [] };
        setHexagons(updatedHexagons);
    }

    return (
        <div className="body">
            <div className="traits">Traits</div>
            <Board hexagons={hexagons} freeHexagon={freeHexagon} />
            {data && <ChampionArray data={filterUniqueChampions(data["setData"]["0"]["champions"])} updateHexagon={updateHexagon} />}
            <div className="items">Items</div>
        </div>
    );
}

export default Body;
