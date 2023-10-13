import useFetch from "./useFetch";
import ChampionArray from "./ChampionArray";
import Board from "./Board";
import { useState } from "react";
import Traits from "./Traits";
import Items from "./Items";

const Body = () => {
    const { data, isPending, error } = useFetch("https://raw.communitydragon.org/13.18/cdragon/tft/en_us.json");
    const [hexagons, setHexagons] = useState(new Array(28).fill({ imageUrl: "", cost: 0 }));
    const [traits, setTraits] = useState([]);

    const filterUniqueChampions = (champions) => {
        const uniqueChampions = {};
        champions.forEach((champion) => {
            uniqueChampions[champion.characterName] = champion;
        });
        return Object.values(uniqueChampions);
    };

    const updateBoard = (imageUrl, cost, traits) => {
        const updatedHexagons = [...hexagons];
        const index = hexagons.findIndex(hexagon => hexagon.cost === 0);
        updatedHexagons[index] = { imageUrl, cost };
        setHexagons(updatedHexagons);

        setTraits((prevTraits) => [...prevTraits, ...traits]);
    };

    const freeHexagon = (index) => {
        const updatedHexagons = [...hexagons];
        updatedHexagons[index] = { imageUrl: "", cost: 0 };
        setHexagons(updatedHexagons);

        const updatedTraits = [...traits];
        setTraits(updatedTraits);
    }

    return (
        <div className="body">
            <Traits traits={traits} />
            <Board hexagons={hexagons} freeHexagon={freeHexagon} />
            {data && <ChampionArray data={filterUniqueChampions(data["setData"]["0"]["champions"])} updateBoard={updateBoard} />}
            <Items />
        </div>
    );
}

export default Body;
