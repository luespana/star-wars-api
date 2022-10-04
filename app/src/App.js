import { useState, useEffect } from "react";
import "./App.css";
import { getCharacter, getPeople } from "./api/people";

function App() {
  const [people, setPeople] = useState([]);
  const [currentCharacter, setCurrentCharacter] = useState(1)
  const [details, setDetails] = useState([])

  useEffect(() => {
    getPeople().then((data) => setPeople(data.results));
  }, []);

  useEffect(()=>{
    getCharacter(currentCharacter).then(setDetails)
  }, [currentCharacter])

  const showDetails = (character) =>{
    const id = Number(character.url.split("/").slice(-2)[0])
    setCurrentCharacter(id)
  }

  return (
    <div>
      <ul>
      {people.map((character) => (
        <li key={character.name} onClick={()=> showDetails(character)}>{character.name}</li>
      ))}
    </ul>
    <aside>
      <h1>
        {details.name}
      </h1>
    </aside>
    </div>
  );
}

export default App;
