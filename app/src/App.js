import { useState, useEffect, useRef } from "react";
import "./App.css";
import { getCharacter, getPeople, searchCharacter } from "./api/people";

function App() {
  const inputSearch = useRef(null);
  const [textSearch, setTextSearch] = useState("");
  const [people, setPeople] = useState([]);
  const [currentCharacter, setCurrentCharacter] = useState(null);
  const [details, setDetails] = useState([]);

  const [page, setPage] = useState(1);

  useEffect(() => {
    getPeople(page).then((data) => setPeople(data));
  }, [page]);

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
    searchCharacter(textSearch).then((data) => setPeople(data));
  };

  const onChangePage = (next) => {
    if (!people.previous && page + next <= 0) return;
    if (!people.next && page + next >= 9) return;
    setPage(page + next);
  };

  return (
    <div>
      <h1 className="titulo">STAR WARS CHARACTERS</h1>
      <div className="form__group field">
        <input
          className="form__field"
          name="name"
          id="name"
          ref={inputSearch}
          onChange={onChangeTextSearch}
          onKeyDown={onSearchSubmit}
          type="text"
          placeholder="Busca un Personaje"
        />
      </div>
      <ul className="lista">
        {people.results &&
          people.results.map((character) => (
            <li key={character.name} onClick={() => showDetails(character)}>
              {character.name}
            </li>
          ))}
      </ul>

      <section>
        <button className="boton" onClick={() => onChangePage(-1)}>
          Prev
        </button>
        <span className="span">| {page} |</span>
        <button className="boton" onClick={() => onChangePage(1)}>
          Next
        </button>
      </section>

      {details && currentCharacter && (
        <aside className="aside">
          <h1>{details.name}</h1>
          <ul>
            <li>Height: {details.height}</li>
            <li>Hair Color: {details.hair_color}</li>
            <li>Eye Color: {details.eye_color}</li>
            <li>Year of Birth: {details.birth_year}</li>
          </ul>
        </aside>
      )}
    </div>
  );
}

export default App;
