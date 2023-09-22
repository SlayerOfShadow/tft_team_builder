import useFetch from "./useFetch";
import ChampionArray from "./ChampionArray";
import Board from "./Board";

const Body = () => {
    const { data, isPending, error } = useFetch("https://raw.communitydragon.org/13.18/cdragon/tft/en_us.json");

    return (
        <div className="body">
            <Board />
            {data && <ChampionArray data={data["setData"]["0"]["champions"]} />}
        </div>
    );
}

export default Body;