import { useState, useEffect } from "react";
import "./App.css";
import { getPeople } from "./api/people";

function App() {
  const [people, setPeople] = useState([]);
  const [currentCharacter, setCurrentCharacter] = useState(1)

  useEffect(() => {
    getPeople().then((data) => setPeople(data.results));
  }, []);

  useEffect(()=>{
  }, [currentCharacter])

  const showDetails = (character) =>{
    const id = Number(character.url.split("/").slice(-2)[0])
    setCurrentCharacter(id)
  }

  return (
    <ul>
      {people.map((character) => (
        <li key={character.name} onClick={()=> showDetails(character)}>{character.name}</li>
      ))}
    </ul>
  );
}

export default App;
