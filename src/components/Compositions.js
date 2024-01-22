import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../utils/AuthContext";
import { getCompositions } from "../firebase/firebase";
import Composition from "./Composition";

const Compositions = () => {
    const { authState } = useContext(AuthContext);
    const [userCompositions, setUserCompositions] = useState([]);

    useEffect(() => {
        const fetchCompositions = async () => {
          try {
            const compositions = await getCompositions(authState.uid);
            setUserCompositions(compositions);
          } catch (error) {
            console.error("Error fetching compositions:", error);
          }
        };
    
        fetchCompositions();
      }, [authState.uid]);
        
    return (
        <div className="compositions">
          {userCompositions.map((composition) => (
              <Composition
                name={composition.name}
                data={composition.compositionData}
              />
            ))}
        </div>
      );
}
 
export default Compositions;