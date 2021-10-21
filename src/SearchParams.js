import { useEffect, useState } from "react";
import useBreedList from "./useBreedList";

import Results from "./Results";

const ANIMALS = Object.freeze(["bird", "cat", "dog", "rabbit", "reptile"]);

const LocationField = ({ location, handler }) => {
  return (
    <label htmlFor="location">
      Location
      <input
        id="location"
        value={location}
        onChange={(e) => handler(e.target.value)}
        placeholder="Location"
      />
    </label>
  );
};

const AnimalField = ({ animal, handler }) => {
  return (
    <label htmlFor="animal">
      Animal
      <select
        id="name"
        name={animal}
        onChange={(e) => handler(e.target.value)}
        onBlur={(e) => handler(e.target.value)}
      >
        <option />
        {ANIMALS.map((animal) => (
          <option value={animal} key={animal}>
            {animal}
          </option>
        ))}
      </select>
    </label>
  );
};

const BreedField = ({ breed, handler, breeds }) => {
  return (
    <label htmlFor="breed">
      Breed
      <select
        id="name"
        name={breed}
        onChange={(e) => handler(e.target.value)}
        onBlur={(e) => handler(e.target.value)}
      >
        <option />
        {breeds.map((breed) => (
          <option value={breed} key={breed}>
            {breed}
          </option>
        ))}
      </select>
    </label>
  );
};

const SearchParams = () => {
  const [location, setLocation] = useState("");
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const [pets, setPets] = useState([]);
  const [page, setPage] = useState(0);
  const [breeds] = useBreedList(animal);

  useEffect(() => {
    requestPets();
  }, [page]);

  async function requestPets() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}&page=${page}`
    );
    const json = await res.json();

    setPets(json.pets);
  }

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestPets();
        }}
      >
        <LocationField location={location} handler={setLocation} />
        <AnimalField animal={animal} handler={setAnimal} />
        <BreedField breed={breed} handler={setBreed} breeds={breeds} />
        <button>Submit</button>
      </form>
      <div className="pagination">
        {page > 0 ? (
          <button className="pagination-btn" onClick={() => setPage(page - 1)}>
            {"<"}
          </button>
        ) : (
          <></>
        )}
        <button className="pagination-btn" onClick={() => setPage(page + 1)}>
          {">"}
        </button>
      </div>
      <h2>Results:</h2>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
