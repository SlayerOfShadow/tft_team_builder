import Item from "./Item";
import { useState } from "react";

const Items = ({data, updateItemsIndex}) => {
    const [searchText, setSearchText] = useState("");

    const clearSearch = () => {
      setSearchText("");
    };

    const filterItems = (items) => {
        return items.filter(item => (
          (item.name !== "Guardian Angel" && item.composition.length > 0 &&
          item.icon.startsWith("ASSETS/Maps/Particles/TFT/Item_Icons/Standard/")) || item.icon.startsWith("ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set9/")
        )).sort((item1, item2) => {
          const isItem1Spatula = item1.icon.startsWith("ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set9/");
          const isItem2Spatula = item2.icon.startsWith("ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set9/");
    
          if (isItem1Spatula && !isItem2Spatula) {
            return -1;
          } else if (!isItem1Spatula && isItem2Spatula) {
            return 1;
          } else if (isItem1Spatula && isItem2Spatula) {
            const compositionDiff = item1.composition.length - item2.composition.length;
            if (compositionDiff !== 0) {
              return compositionDiff;
            }
          }
  
          return item1.name.localeCompare(item2.name);
        });
      }
      
    return (
        <div className="items-array">
            <div className="sort-items">
                <input type="text" placeholder="Search item..." maxLength={100} value={searchText} onChange={(e) => setSearchText(e.target.value)}/>
                {searchText && <button className="clear-search-items-button" onClick={clearSearch}>✕</button>}
            </div>
            <div className="items">
                {filterItems(data).map((item) => (
                    <Item 
                      key={item.name} 
                      url={item.icon} 
                      updateItemsIndex={updateItemsIndex}
                      opacity={item.name.toLowerCase().includes(searchText.toLowerCase()) ? 1 : 0.2}
                    />
                ))}
            </div>
        </div>
      );
}

export default Items;