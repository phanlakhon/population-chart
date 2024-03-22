import React from "react";
import { Icon } from "@iconify/react";

interface GearSliderProps {
  startYear: number;
  endYear: number;
  currentYear: number;
  setCurrentYear: (value: number) => void;
  autoRun: boolean;
  setAutoRun: (autoRun: boolean) => void;
}

const GearSlider: React.FC<GearSliderProps> = ({
  startYear,
  endYear,
  currentYear,
  setCurrentYear,
  autoRun,
  setAutoRun,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentYear(parseInt(event.target.value));
    if (autoRun) setAutoRun(false);
  };

  return (
    <div className="flex justify-start">
      <div className="bg-gray-800 text-white w-[1.5rem] lg:w-[3rem] h-[1.5rem] lg:h-[3rem] mr-4 rounded-full cursor-pointer">
        {autoRun ? (
          <Icon
            icon="lets-icons:stop-fill"
            className="text-2xl lg:text-5xl"
            onClick={() => setAutoRun(!autoRun)}
          />
        ) : (
          <Icon
            icon="mingcute:play-fill"
            className="text-2xl lg:text-5xl"
            onClick={() => setAutoRun(!autoRun)}
          />
        )}
      </div>
      <div className="w-full flex flex-col items-center">
        <input
          type="range"
          min={startYear}
          max={endYear}
          value={currentYear}
          onChange={handleChange}
          className="range-slider w-full"
        />

        <div className="flex justify-between relative w-full h-6">
          <span className="">{startYear}</span>
          <span className="">{endYear}</span>
        </div>
      </div>
    </div>
  );
};

export default GearSlider;
