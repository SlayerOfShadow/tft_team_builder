import useFetch from "./useFetch";
import ChampionArray from "./ChampionArray";
import Board from "./Board";
import { useState, useEffect } from "react";
import Traits from "./Traits";
import Items from "./Items";

const Body = () => {
    const { data, isPending, error } = useFetch("https://raw.communitydragon.org/13.21/cdragon/tft/en_us.json");
    const [hexagons, setHexagons] = useState(new Array(28).fill({ imageUrl: "", cost: 0, traits: null, stars: false, items: [] }));
    const [traits, setTraits] = useState(new Map());
    
    const addChampion = (imageUrl, cost, traits) => {
        const updatedHexagons = [...hexagons];
        const index = hexagons.findIndex(hexagon => hexagon.cost === 0);
        updatedHexagons[index] = { imageUrl: imageUrl, cost: cost, traits: traits, stars: false, items: [] };
        setHexagons(updatedHexagons);
    };

    const dragChampion = (index, imageUrl, cost, traits) => {
      const updatedHexagons = [...hexagons];
      updatedHexagons[index] = { imageUrl: imageUrl, cost: cost, traits: traits, stars: false, items: [] };
      setHexagons(updatedHexagons);
    };

    const swapChampion = (index, targetIndex) => {
      const updatedHexagons = [...hexagons];
      updatedHexagons[targetIndex] = hexagons[index];
      updatedHexagons[index] = hexagons[targetIndex];
      setHexagons(updatedHexagons);
    };

    const removeChampion = (index) => {
        const updatedHexagons = [...hexagons];
        updatedHexagons[index] = { imageUrl: "", cost: 0, traits: null, stars: false, items: [] };
        setHexagons(updatedHexagons);
    }

    const clearBoard = () => {
      const updatedHexagons = [...hexagons];
      for (let index = 0; index < hexagons.length; index++) {
          updatedHexagons[index] = { imageUrl: "", cost: 0, traits: null, stars: false, items: [] };
      }
      setHexagons(updatedHexagons);
    };

    const setStars = (index, stars) => {
        const updatedHexagons = [...hexagons];
        updatedHexagons[index].stars = stars;
        setHexagons(updatedHexagons);
    }

    const addItem = (index, url) => {
      if (hexagons[index].items.length < 3)
      {
        const updatedHexagons = [...hexagons];
        updatedHexagons[index].items.push(url);
        setHexagons(updatedHexagons);
      }
    }

    const removeItem = (index, url) => {
      const updatedHexagons = [...hexagons];
      const itemIndex = updatedHexagons[index].items.indexOf(url);
    
      if (itemIndex >= 0) {
        updatedHexagons[index].items.splice(itemIndex, 1);
        setHexagons(updatedHexagons);
      }
    }

    useEffect(() => {
        const traitsMap = new Map();
        const traitsOrder = new Map();
        const processedUrls = new Set();

        hexagons.forEach(hexagon => {
          if (hexagon.traits) {
              if (!processedUrls.has(hexagon.imageUrl)) {
                  hexagon.traits.forEach((trait, index) => {
                      traitsMap.set(trait, (traitsMap.get(trait) || 0) + 1);
                      traitsOrder.set(trait, index);
                  });
                  processedUrls.add(hexagon.imageUrl);
              }
          }
      });

      const sortedTraits = [...traitsMap.entries()].sort((a, b) => {
        const indexA = traitsOrder.get(a[0]);
        const indexB = traitsOrder.get(b[0]);
        
        if (indexA !== indexB) {
          return indexA - indexB;
        }
    
        return a[0].localeCompare(b[0]);
      });

      setTraits(sortedTraits);
    }, [hexagons]);

    return (
        <div className="body">
          {data && 
            <>
              <Traits traits={traits} traitsData={data["setData"]["0"]["traits"]} />
              <Board hexagons={hexagons} swapChampion={swapChampion} removeChampion={removeChampion} setStars={setStars} removeItem={removeItem}/>
              <ChampionArray data={data["setData"]["0"]["champions"]} addChampion={addChampion} dragChampion={dragChampion} />
              <div className="buttons-and-items">
                <div className="clear-buttons">
                  <button onClick={clearBoard}>Clear board</button>
                  <button>Clear items</button>
                </div>
                <Items data={data["items"]} addItem={addItem}/>
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
