import { render, screen } from "@testing-library/react";
import App from "./App";
import data from "./data.json";

describe("Star Wars App", () => {
  beforeAll(() => jest.spyOn(window, "fetch"));

  it("Sholud show a list of characters from the API", async () => {
    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => data,
    });
    render(<App />);
    expect(window.fetch).toHaveBeenCalledTimes(1);
    expect(window.fetch).toHveBeenCalledWith("https://swapi.dev/api/people/");

    for (let character of data.results) {
      expect(await screen.findByText(character.name)), toBeInTheDocument();
    }
  });
});
