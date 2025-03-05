import { FC, useState } from "react";
import { Car } from "../../types";
import calcPrice from "../../utils/calcPrice";
import Info from "./info";
import Button from "../button";
import { motion } from "motion/react";
import Modal from "../modal";
import generateImage from "../../utils/generateImage";

interface Props {
  car: Car;
}

const Card: FC<Props> = ({ car }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <motion.div initial={{scale:0.5, opacity:0 }}
    whileInView={{scale:1, opacity:1}}
    className="car-card group">
      {/* name of the car */}
      <h2 className="car-card-content-title">
        {car.make} {car.model}
      </h2>

      {/* price of the car */}
      <div className="flex mt-6 text-[19px]">
        <span className="font-semibold">$</span>
        <span className="text-[32px]">{calcPrice(car)}</span>
        <span className="font-semibold self-end">/day</span>
      </div>

      {/* image of the car */}
      <div>
        <img src={generateImage(car)} alt={car.model} className="w-full h-full object-contain min-h-[200px]" />
      </div>

      {/* infos*/}
      <div className="w-full">
        <div className="group-hover:hidden">
          <Info car={car} />
        </div>

        <motion.div initial={{ scale: 0.5 }} whileInView={{ scale: 1 }} className="hidden group-hover:block">
          <Button text="See more" designs="w-full text-white mt-[0.5px]" fn={() => setIsOpen(true)} />
        </motion.div>
      </div>

      <Modal isOpen={isOpen} car={car} close={() => setIsOpen(false)} />
    </motion.div>
  );
};

export default Card;