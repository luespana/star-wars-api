import { render, screen } from '@testing-library/react';
import App from './App';


describe("Star Wars App", () =>{
  beforeAll(() => jest.spy0n(window,"fetch"));

  it("Sholud show a list of characters including Luke Skywalker", () =>{
    render(<App/>);
    expect(screen.getByText("Luke Skaywalker")).toBeInTheDocument();
  });

  it("Sholud show a list of characters from a JSON file", () =>{
    render(<App/>);
    for(let character of data.results){
      expect(screen.getByText("character.name")).toBeInTheDocument();
    }
  });

  it("Sholud show a list of characters from the API", async () =>{
    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => data
    });
    render(<App/>);
    expect(window.fetch).toHaveBeenCalledTimes(1)
    expect(window.fetch).toHveBeenCalledWith("https://swapi.dev/api/people/")

    for (let character of data.results) {
      expect(await screen.findByText(character.name)),toBeInTheDocument()
    }
  });
});