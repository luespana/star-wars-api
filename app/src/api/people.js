export async function getPeople() {
  const response = await fetch("https://swapi.dev/api/people/");
  const data = await response.json();
  return data;
}

export async function getCharacter(id) {
  if (id !== null) {
    const response = await fetch("https://swapi.dev/api/people/" + id);
    const data = await response.json();
    return data;
  }
}

export async function searchCharacter(name) {
  const response = await fetch(`https://swapi.dev/api/people/?search=${name}`);
  const data = await response.json();
  return data;
}
