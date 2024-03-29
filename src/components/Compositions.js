import Composition from "./Composition";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../utils/AuthContext";
import { getCompositions, deleteComposition } from "../firebase/firebase";

const Compositions = () => {
  const { authState } = useContext(AuthContext);
  const [userCompositions, setUserCompositions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(0);
  const pageCompositionsCount = 5;
  const totalPages = Math.ceil(userCompositions.length / pageCompositionsCount);

  const startIndex = currentPage * pageCompositionsCount;
  const endIndex = startIndex + pageCompositionsCount;
  const displayedCompositions = userCompositions.slice(startIndex, endIndex);

  const deleteUserComposition = (id) => {
    setUserCompositions(prevCompositions => prevCompositions.filter(comp => comp.compositionId !== id));
    const updatedTotalPages = Math.ceil((userCompositions.length - 1) / pageCompositionsCount);
    setCurrentPage((prevPage) => Math.min(prevPage, updatedTotalPages - 1));
    deleteComposition(authState.uid, id);
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
        <>
          {displayedCompositions.map((composition) => (
            <Composition
              key={composition.compositionId}
              name={composition.name}
              data={composition.compositionData}
              compositionId={composition.compositionId}
              deleteUserComposition={deleteUserComposition}
            />
          ))}
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                className="button3"
                key={i}
                onClick={() => setCurrentPage(i)}
                style={i === currentPage ? { color: "white" } : {}}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      ) : (
        <p>No compositions saved</p>
      )}
    </div>
  );
  
}

export default Compositions;