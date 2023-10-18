const Trait = ({ trait, count, imageUrl, traitData }) => {
    const minUnitsValues = traitData.effects.map(effect => effect.minUnits);

    const currentLevel = minUnitsValues.reduce((closest, value) => {
        if (value <= count && value > closest) {
            return value;
        }
        return closest;
    }, 0);

    const minUnitsValuesFormatted = traitData.effects.map((effect, index) => (
        <span key={index}>
            {index > 0 ? " > " : ""}
            {effect.minUnits === currentLevel ? (
                <b>{effect.minUnits}</b>
            ) : (
                effect.minUnits
            )}
        </span>
    ));

    const iconColor = () => {
        const currentInfo = traitData.effects.find(effect => effect.minUnits === currentLevel);

        if (currentInfo) {
            switch (currentInfo.style) {
                case 1:
                    return { backgroundColor: 'rgb(160, 110, 90)' };
                case 3:
                    return { backgroundColor: 'rgb(120, 140, 150)' };
                case 4:
                    return { backgroundColor: 'rgb(200, 170, 60)' };
                case 5:
                    return { backgroundColor: 'rgb(210, 210, 240)' };
                default:
                    return;
            }
        }
        return;
    };

    return (
        <div className="trait" style={{ opacity: count < minUnitsValues[0] ? 0.5 : 1 }}>
            <img src={imageUrl} alt="trait" style={iconColor()} />
            <div className="trait-info">
                <b>{trait}</b>
                <br />
                {minUnitsValuesFormatted}
            </div>
            <div className="trait-count"><b>{count}</b></div>
        </div>
    );
}

export default Trait;