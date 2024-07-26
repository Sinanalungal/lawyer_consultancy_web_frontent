import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import PageTitle from "../PageTitle/PageTitle";

type Slide = {
  id: number;
  image: string;
  text: string;
  author: string;
};

type TestimonalCarouselProps = {
  slides: Slide[];
};

const variants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

const TestimonalCarousel: React.FC<TestimonalCarouselProps> = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Determine indices for previous, current, and next slides
  const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
  const nextIndex = (currentIndex + 1) % slides.length;
  return (
    <section className="py-24 max-sm:py-0 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* <div className="mb-16">
          <span className="text-sm text-gray-500 font-medium text-center block mb-2">
            TESTIMONIAL
          </span>
          <h2 className="text-4xl text-center font-bold text-gray-900">
            What our happy users say!
          </h2>
        </div> */}

        <PageTitle title="TESTIMONAL"  description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s" />

        <div className="relative">
          <motion.div
            className="relative flex items-center justify-center"
            key={currentIndex}
            initial="enter"
            animate="center"
            exit="exit"
            variants={variants}
            custom={currentIndex}
            transition={{ duration: 0.5 }}
          >
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`flex max-[400px]:px-4  gap-5 w-full transition-transform ${
                  index === currentIndex ? "block" : "hidden"
                }`}
              >
                <div className="group max-w-sm  max-xl:hidden bg-white border border-gray-300 rounded-xl p-6 transition-all duration-500 hover:border-indigo-600 hover:shadow-sm">
                  <div>
                    <div className="flex items-center mb-7 gap-2 text-amber-500 transition-all duration-500">
                      <svg
                        className="w-5 h-5"
                        viewBox="0 0 18 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.10326 1.31699C8.47008 0.57374 9.52992 0.57374 9.89674 1.31699L11.7063 4.98347C11.8519 5.27862 12.1335 5.48319 12.4592 5.53051L16.5054 6.11846C17.3256 6.23765 17.6531 7.24562 17.0596 7.82416L14.1318 10.6781C13.8961 10.9079 13.7885 11.2389 13.8442 11.5632L14.5353 15.5931C14.6754 16.41 13.818 17.033 13.0844 16.6473L9.46534 14.7446C9.17402 14.5915 8.82598 14.5915 8.53466 14.7446L4.91562 16.6473C4.18199 17.033 3.32456 16.41 3.46467 15.5931L4.15585 11.5632C4.21148 11.2389 4.10393 10.9079 3.86825 10.6781L0.940384 7.82416C0.346867 7.24562 0.674378 6.23765 1.4946 6.11846L5.54081 5.53051C5.86652 5.48319 6.14808 5.27862 6.29374 4.98347L8.10326 1.31699Z"
                          fill="currentColor"
                        />
                      </svg>
                      <span className="text-sm font-semibold text-indigo-600">
                        4.9
                      </span>
                    </div>
                    <p className="text-sm overflow-hidden h-[125px] text-gray-600 leading-6 line-clamp-5 pb-8 group-hover:text-gray-800">
                      {slides[prevIndex].text}
                    </p>
                  </div>
                  <div className="flex items-center gap-5 border-t border-gray-200 pt-5">
                    <img
                      className="rounded-full h-10 w-10"
                      src={slides[prevIndex].image}
                      alt="avatar"
                    />
                    <div>
                      <h5 className="text-gray-900 font-medium mb-1">
                        {slides[prevIndex].author}
                      </h5>
                      <span className="text-xs leading-4 text-gray-500">
                        CEO
                      </span>
                    </div>
                  </div>
                </div>
                <div className="group shadow-lg bg-white border xl:max-w-sm max-w-xl mx-auto border-gray-300 rounded-xl p-6 transition-all duration-500 hover:border-indigo-600 hover:shadow-sm">
                  <div>
                    <div className="flex items-center mb-7 gap-2 text-amber-500 transition-all duration-500">
                      <svg
                        className="w-5 h-5"
                        viewBox="0 0 18 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.10326 1.31699C8.47008 0.57374 9.52992 0.57374 9.89674 1.31699L11.7063 4.98347C11.8519 5.27862 12.1335 5.48319 12.4592 5.53051L16.5054 6.11846C17.3256 6.23765 17.6531 7.24562 17.0596 7.82416L14.1318 10.6781C13.8961 10.9079 13.7885 11.2389 13.8442 11.5632L14.5353 15.5931C14.6754 16.41 13.818 17.033 13.0844 16.6473L9.46534 14.7446C9.17402 14.5915 8.82598 14.5915 8.53466 14.7446L4.91562 16.6473C4.18199 17.033 3.32456 16.41 3.46467 15.5931L4.15585 11.5632C4.21148 11.2389 4.10393 10.9079 3.86825 10.6781L0.940384 7.82416C0.346867 7.24562 0.674378 6.23765 1.4946 6.11846L5.54081 5.53051C5.86652 5.48319 6.14808 5.27862 6.29374 4.98347L8.10326 1.31699Z"
                          fill="currentColor"
                        />
                      </svg>
                      <span className="text-sm font-semibold text-indigo-600">
                        4.9
                      </span>
                    </div>
                    <p className="text-sm overflow-hidden h-[125px] text-gray-600 leading-6 line-clamp-5 pb-8 group-hover:text-gray-800">
                      {slide.text}
                    </p>{" "}
                  </div>
                  <div className="flex items-center gap-5 border-t border-gray-200 pt-5">
                    <img
                      className="rounded-full h-10 w-10"
                      src={slide.image}
                      alt="avatar"
                    />
                    <div>
                      <h5 className="text-gray-900 font-medium mb-1">
                        {slide.author}
                      </h5>
                      <span className="text-xs leading-4 text-gray-500">
                        CEO
                      </span>
                    </div>
                  </div>
                </div>
                <div className="group bg-white max-xl:hidden  max-w-sm border border-gray-300 rounded-xl p-6 transition-all duration-500 hover:border-indigo-600 hover:shadow-sm">
                  <div>
                    <div className="flex items-center mb-7 gap-2 text-amber-500 transition-all duration-500">
                      <svg
                        className="w-5 h-5"
                        viewBox="0 0 18 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.10326 1.31699C8.47008 0.57374 9.52992 0.57374 9.89674 1.31699L11.7063 4.98347C11.8519 5.27862 12.1335 5.48319 12.4592 5.53051L16.5054 6.11846C17.3256 6.23765 17.6531 7.24562 17.0596 7.82416L14.1318 10.6781C13.8961 10.9079 13.7885 11.2389 13.8442 11.5632L14.5353 15.5931C14.6754 16.41 13.818 17.033 13.0844 16.6473L9.46534 14.7446C9.17402 14.5915 8.82598 14.5915 8.53466 14.7446L4.91562 16.6473C4.18199 17.033 3.32456 16.41 3.46467 15.5931L4.15585 11.5632C4.21148 11.2389 4.10393 10.9079 3.86825 10.6781L0.940384 7.82416C0.346867 7.24562 0.674378 6.23765 1.4946 6.11846L5.54081 5.53051C5.86652 5.48319 6.14808 5.27862 6.29374 4.98347L8.10326 1.31699Z"
                          fill="currentColor"
                        />
                      </svg>
                      <span className="text-sm font-semibold text-indigo-600">
                        4.9
                      </span>
                    </div>
                    <p className="text-sm overflow-hidden h-[125px] text-gray-600 leading-6 line-clamp-5 pb-8 group-hover:text-gray-800">
                      {slides[nextIndex].text}
                    </p>
                  </div>
                  <div className="flex items-center gap-5 border-t border-gray-200 pt-5">
                    <img
                      className="rounded-full h-10 w-10"
                      src={slides[nextIndex].image}
                      alt="avatar"
                    />
                    <div>
                      <h5 className="text-gray-900 font-medium mb-1">
                        {slides[nextIndex].author}
                      </h5>
                      <span className="text-xs leading-4 text-gray-500">
                        CEO
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          <button
            onClick={handlePrev}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 px-4 py-2 bg-gray-800 text-white"
          >
            &lt;
          </button>
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 px-4 py-2 bg-gray-800 text-white"
          >
            &gt;
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonalCarousel;
