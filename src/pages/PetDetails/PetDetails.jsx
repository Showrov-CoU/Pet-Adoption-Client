import { useLoaderData } from "react-router-dom";
import PetBanner from "./petBanner";
import PetAdopt from "./PetAdopt";

const PetDetails = () => {
  const data = useLoaderData();

  return (
    <div>
      <PetBanner></PetBanner>
      <PetAdopt pet={data}></PetAdopt>
    </div>
  );
};

export default PetDetails;
