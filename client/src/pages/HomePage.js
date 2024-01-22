import React from "react";
import { Hero, FeaturedArtwork, Contact, Workshop } from "../components";

const HomePage = () => {
  return (
    <main>
      <Hero />
      <FeaturedArtwork />
      <Workshop />
      <Contact />
    </main>
  );
};

export default HomePage;
