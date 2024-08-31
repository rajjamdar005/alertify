import React from "react";
import Navbar from "./components/header";
import HeroSection from "./components/hero";
import Cardnew from "./components/cardnew"; 
import Footer from "./components/footer";
import SafetyMeasures from "./components/safety";
const page = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
       <Cardnew/>

      <SafetyMeasures/> 
      <Footer/>
      <div />
    </div>
  );
};

export default page;