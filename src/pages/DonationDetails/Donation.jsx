import { Button, Label, Modal, TextInput } from "flowbite-react";
import PropTypes from "prop-types";
import { useContext } from "react";
import { useRef } from "react";
import { useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";
import OthersDonate from "./OthersDonate";

const Donation = ({ donate }) => {
  const axiosPublic = useAxiosPublic();

  const { user } = useContext(AuthContext);
  const [openModal, setOpenModal] = useState(false);
  const nameInputRef = useRef(null);
  const amountInputRef = useRef(null);

  const handleForm = () => {
    const name = user?.displayName || nameInputRef.current.value;
    const amount = amountInputRef.current.value;

    const myDonationInfo = {
      name,
      userImage: user?.photoURL,
      amount,
      petName: donate.name,
      Dname: donate.Dname,
      image: donate.image,
    };
    console.log(myDonationInfo);

    axiosPublic.post("/mydonation", myDonationInfo).then((res) => {
      console.log(res.data);
      if (res.data._id) {
        toast.success("successfully Donated...!!");
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
          src={donate.image}
          alt=""
        />
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            FOR: {donate.Dname}
          </h5>
          <h5 className="mb-2 text-base fmb-3 font-normal text-gray-700 dark:text-gray-400">
            {donate.shortDesc}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            <span className="font-bold">Description: </span>
            {donate.longDesc}
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            <span className="font-bold">MaxAmount: </span>
            {donate.maxAmount} tk
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            <span className="font-bold">DonatedAmount: </span>
            {donate.donatedAmount} tk
          </p>

          {/* <button className="w-full text-white font-bold uppercase bg-[#57a538] hover:bg-[#4bc21c] rounded-lg text-sm px-5 py-3 text-center">
            Adopt Now
          </button> */}

          <Button
            className="text-white font-bold"
            gradientMonochrome="lime"
            onClick={() => setOpenModal(true)}
          >
            Donate Now
          </Button>
          <Modal
            show={openModal}
            size="md"
            popup
            onClose={() => setOpenModal(false)}
          >
            <Modal.Header />
            <Modal.Body>
              <div className="space-y-6">
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="name" value="Your Name" />
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
                    <Label htmlFor="amount" value="Your Donation Amount" />
                  </div>
                  <TextInput
                    id="amount"
                    ref={amountInputRef}
                    placeholder="Enter your amount"
                    required
                  />
                </div>

                <div className="w-full">
                  <Button
                    onClick={handleForm}
                    className="text-white font-bold"
                    gradientMonochrome="lime"
                  >
                    Donation Submit
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </div>

      <OthersDonate></OthersDonate>
    </div>
  );
};

Donation.propTypes = {
  donate: PropTypes.object.isRequired,
};

export default Donation;
