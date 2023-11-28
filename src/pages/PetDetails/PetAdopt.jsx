import PropTypes from "prop-types";
import OthersPet from "./OthersPet";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import { useRef } from "react";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";

const PetAdopt = ({ pet }) => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const [openModal, setOpenModal] = useState(false);
  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const phoneRef = useRef(null);
  const addRef = useRef(null);

  const handleForm = () => {
    const name = user?.displayName || nameInputRef.current.value;
    const email = user?.email || emailInputRef.current.value;
    const phone = phoneRef.current.value;
    const address = addRef.current.value;

    const adoptedUserInfo = {
      name,
      userImage: user?.photoURL,
      petid: pet._id,
      petName: pet.name,
      image: pet.image,
      email,
      phone,
      address,
    };
    console.log(adoptedUserInfo);
    axiosPublic.post("/adoption", adoptedUserInfo).then((res) => {
      console.log(res.data);
      if (res.data._id) {
        toast.success("successfully Adopted...!!");
      } else {
        toast.error("Please, try again");
      }
    });
  };
  return (
    <div>
      <div className="mx-auto flex flex-col bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 mb-16">
        <img
          className="object-cover w-full h-full rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
          src={pet.image}
          alt=""
        />
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {pet.name}
          </h5>
          <h5 className="mb-2 text-base fmb-3 font-normal text-gray-700 dark:text-gray-400">
            {pet.shortDesc}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            <span className="font-bold">Location: </span>
            {pet.location}
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            <span className="font-bold">Age: </span>
            {pet.age}
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            <span className="font-bold">Date: </span>
            {pet.date}
          </p>
          <span className="mb-4 bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded ">
            Adopted-Satus: {pet.adopted ? "True" : "Not Adopted"}
          </span>
          {/* <button className="w-full text-white font-bold uppercase bg-[#57a538] hover:bg-[#4bc21c] rounded-lg text-sm px-5 py-3 text-center">
            Adopt Now
          </button> */}

          <Button gradientMonochrome="lime" onClick={() => setOpenModal(true)}>
            Adopt Now
          </Button>
          <Modal
            show={openModal}
            size="md"
            popup
            onClose={() => setOpenModal(false)}
            initialFocus={emailInputRef}
          >
            <Modal.Header />
            <Modal.Body>
              <div className="space-y-6">
                {/* <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  Sign in to our platform
                </h3> */}
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="email" value="Your name" />
                  </div>
                  <TextInput
                    disabled
                    id="name"
                    ref={nameInputRef}
                    placeholder={user?.displayName}
                    required
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="email" value="Your email" />
                  </div>
                  <TextInput
                    disabled
                    id="email"
                    ref={emailInputRef}
                    placeholder={user?.email}
                    required
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="phone" value="Your Phone Number" />
                  </div>
                  <TextInput
                    id="phone"
                    type="text"
                    ref={phoneRef}
                    name="phone"
                    required
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="address" value="Your Location" />
                  </div>
                  <TextInput id="address" type="text" ref={addRef} required />
                </div>

                <div className="w-full">
                  <Button
                    onClick={handleForm}
                    className="text-white font-bold"
                    gradientMonochrome="lime"
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </div>

      <OthersPet></OthersPet>
    </div>
  );
};

PetAdopt.propTypes = {
  pet: PropTypes.object.isRequired,
};

export default PetAdopt;
