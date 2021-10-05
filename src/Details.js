import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Details = () => {
  const [loading, setLoading] = useState(true);
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

  if (loading) return <h2>loading...</h2>;

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
