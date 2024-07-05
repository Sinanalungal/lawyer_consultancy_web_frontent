import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TeamMember {
  name: string;
  experience: string;
  language: string;
  image: string;
}

export const CardStack = ({
  items,
  offset = 10,
  scaleFactor = 0.06,
}: {
  items: TeamMember[];
  offset?: number;
  scaleFactor?: number;
}) => {
  const [cards, setCards] = useState<TeamMember[]>(items);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (items.length > 0) {
      setCards(items);
      startFlipping();
    }
    return () => clearInterval(interval);
  }, [items]);

  let interval: any;
  const startFlipping = () => {
    interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 5000);
  };

  if (!items || items.length === 0) {
    return <div>No team members to display</div>; // Handle empty state
  }

  const currentMember = cards[currentIndex];

  return (
    <div className="relative mb-8 ">
      <motion.div
        className="dark:bg-black lg:w-[400px] max-md:max-w-[400px]  rounded-3xl p-6 shadow-lg  border border-neutral-200 dark:border-white/[0.1] shadow-black/[0.1] dark:shadow-white/[0.05] flex flex-col md:flex-row justify-between items-center"
        style={{
          // maxWidth: "400px",
          height: "auto",
          transformOrigin: "top center",
          background:
            "linear-gradient(90deg, var(--slate-800), var(--slate-900)",
        }}
        animate={{
          scale: 1 - currentIndex * scaleFactor,
        }}
       
      >
        <div className="flex items-center mb-4 max-md:my-auto md:mb-0 md:mr-4">
          <img
            src={currentMember?.image}
            alt={currentMember?.name}
            className="rounded-full object-cover"
            style={{ maxWidth: "80px", maxHeight: "80px" }}
          />
        </div>
        <div className="flex flex-col max-md:py-6 justify-center w-full text-center md:text-left">
          <p className="text-neutral-300 font-medium text-x dark:text-white">
            <strong className="text-x">Name: </strong>{currentMember?.name.toUpperCase()}
          </p>
          <p className="text-neutral-300 text-sm font-normal dark:text-neutral-200">
            <strong className="text-x">Experience: </strong>{currentMember?.experience}
          </p>
          <p className="text-neutral-300 text-sm font-normal dark:text-neutral-200">
            <strong className="text-x">Language: </strong>{currentMember?.language}
          </p>
        </div>
      </motion.div>
    </div>
  );
};
