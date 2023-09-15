import useFetch from "./useFetch";
import Array from "./Array";

const Body = () => {
    const { data, isPending, error } = useFetch("https://raw.communitydragon.org/latest/cdragon/tft/en_us.json");

    return (
        <div className="body">
            {isPending && <div>Loading...</div>}
            {data && <Array data={data.sets["9"].champions} />}
        </div>
    );
}

export default Body;