import React from "react";
import AboutCard from "../about/AboutCard";
import Hblog from "./Hblog";
import HAbout from "./HAbout";
import Hero from "./hero/Hero";
import Hprice from "./Hprice";
import Testimonal from "./testimonal/Testimonal";
import Head from "../common/header/Header";
import UserNav from '../UserFooter'
import UserFooter from "../UserFooter";

const Home = () => {
  return (
    <>
      <Head />
      <Hero />
      <AboutCard />
      <UserFooter />
   
     
    </>
  );
};

export default Home;
