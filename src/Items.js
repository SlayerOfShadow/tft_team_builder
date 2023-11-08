import Item from "./Item";

const Items = ({data}) => {
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
                <input type="text" placeholder="Search item..." maxLength={100}/>
            </div>
            <div className="items">
                {filterItems(data).map((item) => (
                    <Item key={item.name} url={item.icon} />
                ))}
            </div>
        </div>
      );
}

export default Items;