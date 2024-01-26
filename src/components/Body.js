import useFetch from "./useFetch";
import ChampionArray from "./ChampionArray";
import Board from "./Board";
import Traits from "./Traits";
import Items from "./Items";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../utils/AuthContext";
import { saveComposition } from "../firebase/firebase";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Body = () => {
  const currentSet = "10";
  const currentPatch = "14.1";

  const { data, isPending, error } = useFetch("https://raw.communitydragon.org/" + currentPatch + "/cdragon/tft/en_us.json");

  const [hexagons, setHexagons] = useState(new Array(28).fill({ imageUrl: "", cost: 0, traits: null, stars: false, items: [] }));
  const [traits, setTraits] = useState(new Map());
  const [traitsOrder, setTraitsOrder] = useState(new Map());
  const [compositionName, setCompositionName] = useState("");

  const { authState } = useContext(AuthContext);

  const createTraitsOrder = () => {
    const championsData = data["sets"][currentSet]["champions"];
    const traitsMap = new Map();

    championsData.forEach((champion) => {
      const { traits } = champion;

      traits.forEach((trait, index) => {
        if (!traitsMap.has(trait)) {
          traitsMap.set(trait, index);
        }
      });
    });

    setTraitsOrder(traitsMap);
  };

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

  const addItem = (index, name, url, unique, trait) => {
    const maxItems = (name === "Thief's Gloves" ? 1 : 3);

    if (hexagons[index].items.length === 1 && hexagons[index].items[0].name === "Thief's Gloves") {
      return false;
    }

    if (unique && hexagons[index].items.some(item => item.url === url)) {
      return false;
    }

    if (trait !== null && hexagons[index].traits.includes(trait)) {
      return false;
    }

    if (hexagons[index].items.length < maxItems) {
      const updatedHexagons = [...hexagons];
      updatedHexagons[index].items.push({ name: name, url: url, unique: unique, trait });
      setHexagons(updatedHexagons);
      return true;
    }

    return false;
  }

  const removeItem = (position, index) => {
    const updatedHexagons = [...hexagons];
    updatedHexagons[position].items.splice(index, 1);
    setHexagons(updatedHexagons);
  }

  const swapItem = (index, targetIndex, itemIndex, name, url, unique, trait) => {
    if (hexagons[targetIndex].items.length < 3) {
      const itemAdded = addItem(targetIndex, name, url, unique, trait);
      if (itemAdded) removeItem(index, itemIndex);
    }
  }

  const removeAllItems = () => {
    const updatedHexagons = hexagons.map(hexagon => ({
      ...hexagon,
      items: []
    }));
    setHexagons(updatedHexagons);
  };

  const handleSaveComposition = async () => {
    try {
      if (compositionName.length > 0 && traits.size > 0) {
        await saveComposition(authState.uid, compositionName, hexagons);
      } else if (traits.size === 0) {
        toast.warning("Fill your board", {
          position: "top-center",
        });
      } else if (compositionName.length === 0) {
        toast.warning("Enter a name", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Error saving composition:", error);
    }
  };

  useEffect(() => {
    if (data !== null) createTraitsOrder();
    // eslint-disable-next-line
  }, [data]);

  useEffect(() => {
    const updatedTraits = new Map();
    const processedUrls = new Set();

    hexagons.forEach(hexagon => {
      if (hexagon.traits) {
        if (!processedUrls.has(hexagon.imageUrl)) {
          hexagon.traits.forEach(trait => {
            updatedTraits.set(trait, (updatedTraits.get(trait) || 0) + 1);
          });
          processedUrls.add(hexagon.imageUrl);
        }

        hexagon.items.forEach(item => {
          if (item.trait !== null) {
            updatedTraits.set(item.trait, (updatedTraits.get(item.trait) || 0) + 1);
          }
        });
      }
    });

    const sortedTraits = new Map([...updatedTraits.entries()].sort(([traitA, countA], [traitB, countB]) => {
      const priorityA = traitsOrder.get(traitA) || 0;
      const priorityB = traitsOrder.get(traitB) || 0;

      if (priorityA !== priorityB) {
        return priorityA - priorityB;
      } else {
        return traitA.localeCompare(traitB);
      }
    }));

    setTraits(sortedTraits);
  }, [hexagons, traitsOrder]);

  return (
    <div className="body">
      {data &&
        <>
          <div className="name-and-traits">
            <div className="comp-div">
              {authState ? (
                <>
                  <input type="text" placeholder="Composition name..." maxLength={50} value={compositionName} onChange={(e) => setCompositionName(e.target.value)} />
                  <button className="button1" onClick={handleSaveComposition}>Save</button>
                </>
              ) : (
                <p>Log in to save your composition</p>
              )}
            </div>
            <Traits traits={traits} traitsData={data["sets"][currentSet]["traits"]} />
          </div>
          <Board hexagons={hexagons} swapChampion={swapChampion} removeChampion={removeChampion} setStars={setStars} removeItem={removeItem} swapItem={swapItem} />
          <ChampionArray data={data["sets"][currentSet]["champions"]} addChampion={addChampion} dragChampion={dragChampion} />
          <div className="buttons-and-items">
            <div className="clear-buttons">
              <button className="button1" onClick={clearBoard}>Clear board</button>
              <button className="button1" onClick={removeAllItems}>Clear items</button>
            </div>
            <Items data={data["items"]} addItem={addItem} currentSet={currentSet} />
          </div>
        </>
      }
      {isPending &&
        <p className="loading">Loading...</p>
      }
      {error &&
        <p className="error">Could not fetch the data</p>
      }
    </div>
  );
}

export default Body;
