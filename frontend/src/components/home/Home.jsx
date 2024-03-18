import React from "react";
import AboutCard from "../about/AboutCard";
import Hero from "./hero/Hero";
import Head from "../common/header/Header";
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
