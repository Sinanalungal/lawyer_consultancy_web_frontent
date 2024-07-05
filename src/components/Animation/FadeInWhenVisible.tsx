import React, { ReactNode } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface FadeInWhenVisibleProps {
  children: ReactNode;
}

const FadeInWhenVisible: React.FC<FadeInWhenVisibleProps> = ({ children }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  React.useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 1 },
      });
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={controls}
    >
      {children}
    </motion.div>
  );
};

export default FadeInWhenVisible;
