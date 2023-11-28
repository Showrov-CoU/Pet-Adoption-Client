const PetBanner = () => {
  return (
    <section className="bg-white dark:bg-gray-900 mt-20">
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Explore our of adorable pets waiting for a loving home.
        </h1>
        <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
          Our pet adoption platform is dedicated to helping you find the ideal
          furry friend to bring joy, love, and companionship into your life.
        </p>
      </div>
    </section>
  );
};

export default PetBanner;
