import React from 'react';

interface TabContentProps {
  open: string;
  tabCategory: string;
  details: any;
}

const TabContent: React.FC<TabContentProps> = ({ open, tabCategory, details }) => {
  return (
    <div>
      <div
        className={`p-6 text-base leading-relaxed text-body-color dark:text-dark-6 ${
          open === tabCategory ? 'block' : 'hidden'
        }`}
      >
        {details}
      </div>
    </div>
  );
};

export default TabContent;
