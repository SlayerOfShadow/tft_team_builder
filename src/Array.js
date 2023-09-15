const Array = ({ data }) => {
    return (
        <div className="array">
            {data.map((element) => (
                <p>{element.name}</p>
            ))}
        </div>
    );
}

export default Array;