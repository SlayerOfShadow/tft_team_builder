import Composition from "./Composition";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../utils/AuthContext";
import { getCompositions, deleteComposition } from "../firebase/firebase";

const Compositions = () => {
  const { authState } = useContext(AuthContext);
  const [userCompositions, setUserCompositions] = useState([]);
  const [loading, setLoading] = useState(true);

  const deleteUserComposition = (id) => {
    setUserCompositions(prevCompositions => prevCompositions.filter(comp => comp.compositionId !== id));
    deleteComposition(id);
  };

  useEffect(() => {
    const fetchCompositions = async () => {
      try {
        if (authState) {
          const compositions = await getCompositions(authState.uid);
          setUserCompositions(compositions);
        }
      } catch (error) {
        console.error("Error fetching compositions:", error);
      } finally {
        setLoading(false);
      }
    };

    if (authState)
    {
      fetchCompositions();
    }
  }, [authState]);

  if (loading) {
    return (
      <div className="compositions">
        <p className="loading">Loading...</p>
      </div>
    );
  }

  return (
    <div className="compositions">
      {userCompositions.length > 0 ? (
        userCompositions.map((composition) => (
          <Composition
            key={composition.compositionId}
            name={composition.name}
            data={composition.compositionData}
            compositionId={composition.compositionId}
            deleteUserComposition={deleteUserComposition}
          />
        ))
      ) : (
        <p>No compositions saved</p>
      )}
    </div>
  );
}

export default Compositions;