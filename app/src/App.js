import { useState, useEffect, useRef } from "react";
import "./App.css";
import { getCharacter, getPeople, searchCharacter } from "./api/people";

function App() {
  const inputSearch = useRef(null);
  const [textSearch, setTextSearch] = useState("");
  const [people, setPeople] = useState([]);
  const [currentCharacter, setCurrentCharacter] = useState(null);
  const [details, setDetails] = useState([]);

  useEffect(() => {
    getPeople().then((data) => setPeople(data.results));
  }, []);

  useEffect(() => {
    getCharacter(currentCharacter).then(setDetails);
  }, [currentCharacter]);

  const showDetails = (character) => {
    const id = Number(character.url.split("/").slice(-2)[0]);
    setCurrentCharacter(id);
  };

  const onChangeTextSearch = (event) => {
    event.preventDefault();
    const text = inputSearch.current.value;
    setTextSearch(text);
  };

  const onSearchSubmit = (event) => {
    if (event.key !== "Enter") return;
    inputSearch.current.value = "";
    setDetails([]);
    searchCharacter(textSearch).then((data) => setPeople(data.results));
  };

  return (
    <div>
      <input
        ref={inputSearch}
        onChange={onChangeTextSearch}
        onKeyDown={onSearchSubmit}
        type="text"
        placeholder="Busca un Personaje"
      />
      <ul>
        {people.map((character) => (
          <li key={character.name} onClick={() => showDetails(character)}>
            {character.name}
          </li>
        ))}
      </ul>
      {details && currentCharacter && (
        <aside>
          <h1>{details.name}</h1>
          <ul>
            <li>Height: {details.height}</li>
            <li>Mass: {details.mass}</li>
            <li>Year of Birth: {details.birth_year}</li>
          </ul>
        </aside>
      )}
    </div>
  );
}

export default App;
