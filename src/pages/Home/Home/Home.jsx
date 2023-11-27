import AboutUs from "../AboutUs/About";
import Banner from "../Banner/Banner";
import CallAction from "../CallAction/CallAction";
import Categories from "../Categories/Categories";

import Testimonials from "../Testimonials/Testimonials";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Categories></Categories>
      <CallAction></CallAction>
      <AboutUs></AboutUs>
      <Testimonials></Testimonials>
    </div>
  );
};

export default Home;
