import aboutus from "../../../assets/Aboutus.jpg";

const AboutUs = () => {
  return (
    <div className="px-2 md:px-10 mt-36 mb-10 lg:px-16">
      <h1 className="text-center text-4xl font-bold pb-10">About Us</h1>
      <div className="flex flex-col md:flex-row md:items-center gap-5">
        <div className="md:w-[40%] h-full">
          <img className="w-full h-full rounded-lg " src={aboutus} alt="" />
        </div>
        <div className="space-y-6 md:w-[60%]">
          <div className="space-y-1">
            <h1 className="text-center text-xl md:text-2xl font-bold">
              Who are we?
            </h1>
            <p className="text-sm text-justify md:text-base">
              Welcome to our pet adoption community! Our mission is to connect
              loving homes with pets in need. Here&apos;s a little about how our
              website works and why it was created:
            </p>
          </div>
          <div className="space-y-1">
            <h1 className="text-center text-xl md:text-2xl font-bold">
              How it Works
            </h1>
            <p className="text-sm text-justify md:text-base">
              Browse through our profiles of adorable pets available for
              adoption. When you find a furry friend that steals your heart,
              follow our simple adoption process to bring them home.
            </p>
          </div>
          <div className="space-y-1">
            <h1 className="text-center text-xl md:text-2xl font-bold">
              Why We Exist
            </h1>
            <p className="text-sm text-justify md:text-base">
              We believe in giving every pet a chance at a loving home. Our
              platform is designed to make the adoption process seamless and to
              create a community that values the well-being of animals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
