import { motion, Variants } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface AccordionItemProps {
  title: string;
  content: string;
  isExpanded: boolean;
  onToggle: () => void;
}

interface AccordionProps {
  items: Array<{
    title: string;
    content: string;
  }>;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  content,
  isExpanded,
  onToggle,
}) => {
  const cardVariants: Variants = {
    collapsed: {
      height: "60px",
      transition: { type: "spring", stiffness: 300, damping: 15 },
    },
    expanded: {
      height: "auto",
      transition: { type: "spring", stiffness: 300, damping: 15 },
    },
  };

  const contentVariants: Variants = {
    collapsed: { opacity: 0 },
    expanded: {
      opacity: 1,
      transition: { delay: 0.1 },
    },
  };

  const chevronVariants: Variants = {
    collapsed: { rotate: 0 },
    expanded: { rotate: 180 },
  };

  return (
    <motion.div
      className={`w-90 dark:bg-gray-800' my-4 h-full cursor-pointer select-none overflow-hidden rounded-lg border border-gray-300 dark:border-gray-700 z-40`}
      variants={cardVariants}
      initial="collapsed"
      animate={isExpanded ? "expanded" : "collapsed"}
      onClick={onToggle}
    >
      <div className="flex items-center justify-between p-4 text-gray-900 dark:text-gray-100">
        <h2 className="m-0 text-sm font-semibold text-[#1e266e]">{title}</h2>
        <motion.div variants={chevronVariants}>
          <ChevronDown size={18} />
        </motion.div>
      </div>
      <motion.div
        className="text-md select-none px-4 py-4"
        variants={contentVariants}
        initial="collapsed"
        animate={isExpanded ? "expanded" : "collapsed"}
      >
        <p className="m-0 text-sm text-gray-900 dark:text-gray-100">
          {content}
        </p>
      </motion.div>
    </motion.div>
  );
};

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          content={item.content}
          isExpanded={expandedIndex === index}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </div>
  );
};

const accordionItems = [
  {
    title: "Our Services",
    content:
      "We offer expert legal consultation across various fields including family law, criminal law, corporate law, and property disputes. Our experienced lawyers provide professional guidance to help you navigate complex legal matters.",
  },
  {
    title: "How to Book a Consultation",
    content:
      "Booking a consultation is simple. Choose a lawyer based on their expertise, select a time slot that suits you, and confirm your appointment. You will receive an notification when the session starts.",
  },
  {
    title: "How to Submit Your Case",
    content:
      "Submit your case through our secure online platform. Provide a detailed description of your legal issue, and our lawyers will review your case to determine if they can take it. Then you can then choose your preferred lawyer from the available lawyers.",
  },
  {
    title: "Why Choose Us?",
    content:
      "Find out why our legal consultancy is the best choice for your legal needs, with personalized service and trusted expertise.",
  },
];

const LandingAccordion: React.FC = () => {
  return (
    <>
      <h2 className="text-3xl font-bold text-center max-sm:text-2xl sm:px-10   pt-4 text-[#1e266e]">
        Accordition
      </h2>
      <div className="max-w-7xl mx-auto py-8 sm:px-10 px-4">
        <Accordion items={accordionItems} />
      </div>
    </>
  );
};
export default LandingAccordion;
