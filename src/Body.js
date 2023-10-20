import useFetch from "./useFetch";
import ChampionArray from "./ChampionArray";
import Board from "./Board";
import { useState, useEffect } from "react";
import Traits from "./Traits";
import Items from "./Items";

const Body = () => {
    const { data, isPending, error } = useFetch("https://raw.communitydragon.org/13.20/cdragon/tft/en_us.json");
    const [hexagons, setHexagons] = useState(new Array(28).fill({ imageUrl: "", cost: 0, traits: null, stars: false }));
    const [traits, setTraits] = useState(new Map());

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
        updatedHexagons[index] = { imageUrl: imageUrl, cost: cost, traits: traits, stars:false };
        setHexagons(updatedHexagons);
    };

    const freeHexagon = (index) => {
        const updatedHexagons = [...hexagons];
        updatedHexagons[index] = { imageUrl: "", cost: 0, traits: null, stars: false };
        setHexagons(updatedHexagons);
    }

    const setStars = (index, stars) => {
        const updatedHexagons = [...hexagons];
        updatedHexagons[index].stars = stars;
        setHexagons(updatedHexagons);
    }

    const clearBoard = () => {
        const updatedHexagons = [...hexagons];
        for (let index = 0; index < hexagons.length; index++) {
            updatedHexagons[index] = { imageUrl: "", cost: 0, traits: null, stars: false };
        }
        setHexagons(updatedHexagons);
    };

    useEffect(() => {
        const traitsMap = new Map();
        const processedUrls = new Set();

        hexagons.forEach(hexagon => {
            if (hexagon.traits) {
                if (!processedUrls.has(hexagon.imageUrl)) {
                    hexagon.traits.forEach(trait => {
                        traitsMap.set(trait, (traitsMap.get(trait) || 0) + 1);
                    });
                    processedUrls.add(hexagon.imageUrl);
                }
            }
        });

        setTraits(traitsMap);
    }, [hexagons]);

    return (
        <div className="body">
          {data && 
            <>
              <Traits traits={traits} traitsData={data["setData"]["0"]["traits"]} />
              <Board hexagons={hexagons} freeHexagon={freeHexagon} setStars={setStars} />
              <ChampionArray data={filterUniqueChampions(data["setData"]["0"]["champions"])} updateBoard={updateBoard} />
              <div className="buttons-and-items">
                <div className="clear-buttons">
                  <button onClick={clearBoard}>Clear board</button>
                  <button>Clear items</button>
                </div>
                <Items />
              </div>
            </>
          }
          {isPending && 
            <h1>Loading...</h1>
          }
          {error && 
            <h1>Could not fetch the data</h1>
          }
        </div>
      );
}

export default Body;
