import Composition from "./Composition";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../utils/AuthContext";
import { getCompositions } from "../firebase/firebase";
import { ToastContainer } from "react-toastify";

const Compositions = () => {
  const { authState } = useContext(AuthContext);
  const [userCompositions, setUserCompositions] = useState([]);

  useEffect(() => {
    const fetchCompositions = async () => {
      try {
        if (authState) {
          const compositions = await getCompositions(authState.uid);
          setUserCompositions(compositions);
        }
      } catch (error) {
        console.error("Error fetching compositions:", error);
      }
    };

    fetchCompositions();
  }, [authState, userCompositions]);

  return (
    <div className="compositions">
      {userCompositions.map((composition) => (
        <Composition
          key={composition.compositionId}
          name={composition.name}
          data={composition.compositionData}
          compositionId={composition.compositionId}
        />
      ))}
      <ToastContainer />
    </div>
  );
}

export default Compositions;