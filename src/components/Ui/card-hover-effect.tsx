import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { cn } from "../../utils/cn";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    // link: string;
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2  lg:grid-cols-2  sm:py-10",
        className
      )}
    >
      {items.map((item, idx) => (
        <div
        //   to={item?.link}
          key={idx}
          className="relative  group   block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full  w-full bg-slate-800 bg-opacity-20 dark:bg-slate-800/[0.8] block  rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </Card>
        </div>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    // <div
    //   className={cn(
    //     "rounded-2xl h-full w-full p-4 shadow-xl overflow-hidden bg-white  border border-transparent  relative z-20",
    //     className
    //   )}
    // >
    //   <div className="relative z-50">
    //     <div className="p-4">{children}</div>
    //   </div>
    // </div>
     <div
     key={"dummy-content" }
     className={cn(
        "bg-[#F5F5F7] shadow-xl h-full overflow-hidden  dark:bg-neutral-800 sm:p-8 p-3  border border-transparent rounded-3xl relative z-20",
        className
      )}
   >
     <p className="text-neutral-600 dark:text-neutral-400 text-sm font-sans max-w-3xl mx-auto">
     <div className="relative z-50">
      <div className="p-4">{children}</div>
     </div>
     </p>
     
   </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    // text-[#1e266e]
    <h4 className={cn("text-black  text-xl font-bold tracking-wide mt-4", className)}> 
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-7 text-zinc-500 tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};
