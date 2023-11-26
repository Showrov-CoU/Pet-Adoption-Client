import petAdoption from "./pet-Adoption.json";
import Lottie from "lottie-react";

const Banner = () => {
  return (
    <section className="bg-white mt-20 md:mt-20 lg:mt-4 dark:bg-gray-900">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold md:text-5xl xl:text-6xl dark:text-white">
            Embrace Unconditional Love: Adopt Your Perfect Companion
          </h1>
          <p className="max-w-2xl mb-6 font-light text-justify text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            Transform a life: Adopt a pet and make your home their forever haven.
            Experience the joy of unconditional love and companionship. Start
            your heartwarming journey today.
          </p>
          <a
            href="#"
            className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-[#57a538] hover:bg-[#4bc21c]"
          >
            Get started
          </a>
          <a
            href="#"
            className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-primary rounded-lg hover:bg-gray-100 dark:text-white"
          >
            Speak to Adopt
          </a>
        </div>
        <div className="lg:mt-0 lg:col-span-5 lg:flex">
          {/* <img
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png"
            alt="mockup"
          /> */}
          <Lottie animationData={petAdoption}></Lottie>
        </div>
      </div>
    </section>
  );
};

export default Banner;
