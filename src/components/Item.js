const Item = ({url, updateItemsIndex}) => {
    const imageUrl = "https://raw.communitydragon.org/latest/game/" + url.toLowerCase().replace(".tex", ".png");

    const handleOnDragEnd = (event) => {
        const x = event.clientX;
        const y = event.clientY;
    
        const elementAtDragEnd = document.elementFromPoint(x, y);
    
        if (elementAtDragEnd) {
            const type = elementAtDragEnd.getAttribute("type");
            const positionValue = elementAtDragEnd.getAttribute("position");
            if (type === "champion")
            {
                updateItemsIndex(positionValue, imageUrl);
            }
        }
    };

    return ( 
        <div className="item-card">
            <img
                src={imageUrl} 
                alt="item-icon"
                onDragEnd={handleOnDragEnd}
            />
        </div>
     );
}
 
export default Item;