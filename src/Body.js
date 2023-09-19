import useFetch from "./useFetch";
import ChampionArray from "./ChampionArray";

const Body = () => {
    const { data, isPending, error } = useFetch("https://raw.communitydragon.org/latest/cdragon/tft/en_us.json");

    return (
        <div className="body">
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {data && <ChampionArray data={data["setData"]["0"]["champions"]} />}
        </div>
    );
}

export default Body;