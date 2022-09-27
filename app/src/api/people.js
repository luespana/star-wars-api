export async function getPeople() {
  const response = await fetch("https://swapi.dev/api/people/");
  const data = await response.json();
  return data;
}

export async function getCharacter(id=1){
  const response = await fetch("https://swapi.dev/api/people/${id}/")
  const data = await response.json()
  return data
}
