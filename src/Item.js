const Item = ({url}) => {
    const imageUrl = "https://raw.communitydragon.org/latest/game/" + url.toLowerCase().replace(".tex", ".png");
    
    return ( 
        <div className="item-card">
            <img
                src={imageUrl} 
                alt="item-icon" 
            />
        </div>
     );
}
 
export default Item;