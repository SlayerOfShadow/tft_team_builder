import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../utils/AuthContext";
import { getCompositions } from "../firebase/firebase";

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
          <ul>
            {userCompositions.map((composition) => (
              <li key={composition.id}>{composition.name}</li>
            ))}
          </ul>
        </div>
      );
}
 
export default Compositions;