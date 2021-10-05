import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Details = () => {
  const setLoading = useState(true)[1];
  const [petDetails, setPetDetails] = useState({});
  const params = useParams();

  useEffect(() => {
    fetchPetDetails();
  }, []);

  async function fetchPetDetails() {
    const petDetailsResponse = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${params.id}`
    );
    const json = await petDetailsResponse.json();

    setLoading(false);
    setPetDetails(json.pets[0]);
  }

  const { name, animal, breed, city, state, description } = petDetails;

  return (
    <div className="details">
      <h1>{name}</h1>
      <h2>
        {animal} - {breed} - {city}, {state}
      </h2>
      <button>Adopt {name}</button>
      <p>{description}</p>
    </div>
  );
};

export default Details;
