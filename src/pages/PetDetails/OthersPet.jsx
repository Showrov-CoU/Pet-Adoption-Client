import Pet from "../../Components/Pet";
import usePets from "../../Hooks/usePets";

const OthersPet = () => {
  const [othersPet] = usePets();
  return (
    <div>
      <div className="md:px-10 mb-10 lg:px-16">
        <h1 className="text-center text-4xl font-bold pb-10">Others Pet</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {othersPet.map((pet) => (
            <Pet key={pet._id} pet={pet}></Pet>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OthersPet;
