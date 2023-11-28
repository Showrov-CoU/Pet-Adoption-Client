import { useEffect, useState } from "react";
import Category from "../../../Components/Category";

const Categories = () => {
  const [allCategory, setAllCategory] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/categories")
      .then((res) => res.json())
      .then((data) => {
        
        setAllCategory(data);
      });
  }, []);
  return (
    <div className="md:px-10 mb-10 lg:px-16">
      <h1 className="text-center text-4xl font-bold pb-10">Pet Categories</h1>
      <div className="w-fit mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {allCategory?.map((category, idx) => (
          <Category key={idx} category={category}></Category>
        ))}
      </div>
    </div>
  );
};

export default Categories;
