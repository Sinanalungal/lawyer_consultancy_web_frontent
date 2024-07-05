import React from "react";

interface PageTitleProps {
  title:string;
  subtitle?:string;
}

const PageTitle: React.FC<PageTitleProps> = ({title,subtitle}) => {
  return (
    <section className="gray-100  dark:bg-dark">
      <div className="mx-auto px-4  sm:container">
        <div className="flex flex-col items-center">
          <h2 className="mb-2 text-4xl font-semibold  text-dark dark:text-white">
            {title.toUpperCase()}
          </h2>
          {subtitle&&(<p className="text-sm font-medium text-body-color dark:text-dark-6">
            {subtitle}
          </p>)}
        </div>
      </div>
    </section>
  );
};

export default PageTitle;
