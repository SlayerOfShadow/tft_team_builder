import useFetch from "./useFetch";
import ChampionArray from "./ChampionArray";
import Board from "./Board";

const Body = () => {
    const { data, isPending, error } = useFetch("https://raw.communitydragon.org/13.18/cdragon/tft/en_us.json");

    // Function to filter unique champions based on characterName
    const filterUniqueChampions = (champions) => {
        const uniqueChampions = {};
        champions.forEach((champion) => {
            uniqueChampions[champion.characterName] = champion;
        });
        return Object.values(uniqueChampions);
    };

    return (
        <div className="body">
            <Board />
            {data && <ChampionArray data={filterUniqueChampions(data["setData"]["0"]["champions"])} />}
        </div>
    );
}

export default Body;
