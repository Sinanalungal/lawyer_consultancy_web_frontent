import React, { useState, useRef } from 'react';
import TabContent from './TabContent';

type TabCategory = 'home' | 'about' | 'team' | 'company';

const Tab: React.FC = () => {
  const [open, setOpen] = useState<TabCategory>('home');
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleTabOpen = (tabCategory: TabCategory) => {
    setOpen(tabCategory);
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pb-20 pt-4 2xl:pt-10  dark:bg-dark lg:pb-[120px]">
      <div className="container">
        <div className="flex flex-wrap">
          <div className="w-full px-4">
            <div className="relative  mb-14 w-full">
              <div
                ref={scrollRef}
                className="flex max-sm:px-12  relative gap-1 overflow-x-scroll no-scrollbar border-b border-[#E4E4E4] px-4 py-3 dark:border-dark-3 flex-row"
              >
                <a
                  onClick={() => handleTabOpen('home')}
                  className={`cursor-pointer whitespace-nowrap text-nowrap rounded-full px-4 py-3 text-xs font-medium md:text-sm lg:px-6 ${
                    open === 'home'
                      ? 'bg-slate-200 text-black'
                      : 'text-body-color hover:bg-slate-100 hover:text-black dark:text-dark-6 dark:hover:text-white'
                  }`}
                >
                  Home
                </a>
                <a
                  onClick={() => handleTabOpen('about')}
                  className={`cursor-pointer whitespace-nowrap  text-nowrap rounded-full px-4 py-3 text-xs font-medium md:text-sm lg:px-6 ${
                    open === 'about'
                      ? 'bg-slate-200 text-black'
                      : 'text-body-color  hover:bg-slate-100 hover:text-black dark:text-dark-6 dark:hover:text-white'
                  }`}
                >
                  About Us
                </a>
                <a
                  onClick={() => handleTabOpen('team')}
                  className={`cursor-pointer whitespace-nowrap text-nowrap rounded-full px-4 py-3 text-xs font-medium md:text-sm lg:px-6 ${
                    open === 'team'
                      ? 'bg-slate-200 text-black'
                      : 'text-body-color hover:bg-slate-100 hover:text-black dark:text-dark-6 dark:hover:text-white'
                  }`}
                >
                  Our Team
                </a>
                <a
                  onClick={() => handleTabOpen('company')}
                  className={`cursor-pointer whitespace-nowrap text-nowrap rounded-full px-4 py-3 text-xs font-medium md:text-sm lg:px-6 ${
                    open === 'company'
                      ? 'bg-slate-200 text-black'
                      : 'text-body-color hover:bg-slate-100 hover:text-black dark:text-dark-6 dark:hover:text-white'
                  }`}
                >
                  Company Details
                </a>
              </div>
              <button
                onClick={scrollLeft}
                className="absolute sm:hidden left-0 top-8 transform font-bold  bg-white text-gray-700 -translate-y-1/2 px-4 py-2 dark:bg-dark-2  "
              >
                {'<'}
              </button>
              <button
                onClick={scrollRight}
                className="absolute sm:hidden right-0 top-8 transform  -translate-y-1/2 px-4 py-2 text-gray-700 font-bold bg-white dark:bg-dark-2 pl-3"
              >
                {'>'}
              </button>
              <TabContent
                details="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia nisi, doloribus nulla cumque molestias corporis eaque harum vero! Quas sit odit optio debitis nulla quisquam, dolorum quaerat animi iusto quod."
                tabCategory="home"
                open={open}
              />
              <TabContent
                details="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia nisi, doloribus nulla cumque molestias corporis eaque harum vero!"
                tabCategory="about"
                open={open}
              />
              <TabContent
                details="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia nisi, doloribus nulla cumque molestias corporis eaque harum vero! Quas sit odit optio debitis nulla quisquam, dolorum quaerat animi iusto quod. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit mollitia nam eligendi reprehenderit reiciendis saepe laboriosam maiores voluptas. Quo, culpa amet fugiat ipsam sed quod hic, veritatis ducimus recusandae repellat quasi eaque, suscipit praesentium totam?"
                tabCategory="team"
                open={open}
              />
              <TabContent
                details="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia nisi, doloribus nulla cumque molestias corporis eaque harum vero! Quas sit odit optio debitis nulla quisquam, dolorum quaerat animi iusto quod."
                tabCategory="company"
                open={open}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tab;
