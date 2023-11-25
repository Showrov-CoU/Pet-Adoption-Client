import { useEffect, useState } from "react";
import Category from "../../../Components/Category";

const Categories = () => {
  const [pets, setPets] = useState([]);
  useEffect(() => {
    fetch("/pets.json")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPets(data);
      });
  }, []);
  return (
    <div>
      <h1 className="text-center text-4xl font-bold">
        Pet Categories
      </h1>
      <div>
        {pets.map((pet, idx) => (
          <Category key={idx} pet={pet}></Category>
        ))}
      </div>
    </div>
  );
};

export default Categories;
