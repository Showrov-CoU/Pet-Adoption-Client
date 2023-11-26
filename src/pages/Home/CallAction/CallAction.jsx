import { useEffect, useState } from "react";
import Action from "../../../Components/Action";

const CallAction = () => {
  const [actionData, setActionData] = useState([]);
  useEffect(() => {
    fetch("/cta.json")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setActionData(data);
      });
  }, []);
  return (
    <div className="px-2 md:px-10 mt-36 mb-10 lg:px-16">
      <h1 className="text-center text-4xl font-bold pb-10">
        Transform a Life: Adopt a Pet Today!
      </h1>
      <div className="w-fit mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
        {actionData.map((item, idx) => (
          <Action key={idx} item={item}></Action>
        ))}
      </div>
    </div>
  );
};

export default CallAction;
