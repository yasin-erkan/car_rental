import { FC } from "react";
import Button from "../button";
import { motion } from "motion/react";

const Hero: FC = () => {
  return (
    <div className="hero">
      <div className="pt-14 padding-x flex-1 max-w-[920px]">
        <h1 className="hero-title">Drive Beyond Limits, Explore Without Boundaries</h1>

        <p className="hero-subtitle">
          Discover the perfect ride for your next adventure. Whether it`s a weekend getaway or a business trip, 
          our premium car rental service ensures a smooth and stylish journey.
        </p>

        <Button text="Find Your Ride" designs="mt-10" />
      </div>

      <div className="flex justify-center">
        <motion.img
          initial={{ translateX: 200, scale: 0.7 }}
          animate={{ translateX: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          src="/hero.png"
          alt="Luxury car ready for an adventure"
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default Hero;
