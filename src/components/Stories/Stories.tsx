import React from "react";

interface StoriesProps {
  text: string;
}

const Stories: React.FC<StoriesProps> = ({ text }) => {
  return (
    <div className="max-w-[370px] rounded-md border space-y-2 text-black p-3 mt-6 flex flex-col items-center relative m-2">
      <div className="w-[60px] -translate-y-9  absolute h-[60px] bg-black rounded-full"></div>
      <div className="pt-5">
        <div className="font-medium flex flex-col items-center text-sm space-y-0">
          <p>gireesh</p>
          <p className="text-xs font-medium">ceo</p>
        </div>
        <div className="w-full p-1 relative flex items-center justify-center h-auto">
          <p className="text-[10px] h-[60px]  overflow-hidden   mb-1">{text}</p>
        </div>
      </div>
    </div>
  );
};

export default Stories;
