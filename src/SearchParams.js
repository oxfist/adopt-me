import { useEffect, useState } from "react";

import Pet from "./Pet";

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
  const [location, setLocation] = useState("Seattle, WA");
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const [pets, setPets] = useState([]);
  const breeds = [];

  useEffect(() => {
    requestPets();
  }, []);

  async function requestPets() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );
    const json = await res.json();

    setPets(json.pets);
  }

  return (
    <div className="search-params">
      <form>
        <LocationField location={location} handler={setLocation} />
        <AnimalField animal={animal} handler={setAnimal} />
        <BreedField breed={breed} handler={setBreed} breeds={breeds} />
        <button>Submit</button>
      </form>
      <h2>Results:</h2>
      {pets.map((pet) => (
        <Pet
          name={pet.name}
          animal={pet.animal}
          breed={pet.breed}
          key={pet.id}
        />
      ))}
    </div>
  );
};

export default SearchParams;
