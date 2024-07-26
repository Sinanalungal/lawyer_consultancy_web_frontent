import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GrFormNext ,GrFormPrevious } from "react-icons/gr";



interface CarouselProps {
  items: React.ReactNode[];
}

const Carousel: React.FC<CarouselProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="relative w-full max-sm:h-[550px]  max-[400px]:h-[300px]  sm:w-[500px] sm:h-[500px]  lg:h-[400px] rounded-xl h-64 overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="absolute w-full h-full flex items-center justify-center"
        >
          {items[currentIndex]}
        </motion.div>
      </AnimatePresence>
      <button
        className="absolute top-1/2 left-0 transform -translate-y-1/2 max-sm:bg-gray-800 max-sm:text-white   text-gray-800 p-2"
        onClick={prevSlide}
      >
        <GrFormPrevious />
      </button>
      <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2 max-sm:bg-gray-800 max-sm:text-white  text-gray-800 p-2"
        onClick={nextSlide}
      >
        <GrFormNext />
      </button>
    </div>
  );
};

export default Carousel;
