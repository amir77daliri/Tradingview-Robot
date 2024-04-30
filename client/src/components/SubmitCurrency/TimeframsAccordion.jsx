import { useState } from "react";

import { timeFrames } from "../../utils/timeframes";

const TimeframesAccordion = ({handleTimeFrameChange}) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  return (
    <>
      {/* Accordion Timeframes Group */}
      <div className="mb-4">
        <button
          onClick={toggleAccordion}
          className="text-blue-500 hover:underline focus:outline-none"
        >
          {isAccordionOpen ? "Choose a Timeframe" : "Show Timeframes"}
        </button>
        <hr />
        <div className="grid grid-cols-1 md:grid-cols-3 max-h-80 overflow-y-auto">
          {isAccordionOpen && (
            <>
              <div className="grid grid-cols-1">
                <h4 className="text-gray-500 mt-4 md:ml-5">Minutes</h4>
                {timeFrames["MINUTES"].map((timeframe, index) => (
                  <div key={index} className="">
                    {/* Add your checkbox group here */}
                    <label className="block mt-2">
                      <input
                        type="radio"
                        className="mr-2"
                        name="timeframe"
                        value={timeframe[1]}
                        onChange={handleTimeFrameChange}
                      />
                      {timeframe[0]}
                    </label>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1">
                <h4 className="text-gray-500 mt-4 md:ml-5">Hours</h4>
                {timeFrames["HOURS"].map((timeframe, index) => (
                  <div key={index}>
                    {/* Add your checkbox group here */}
                    <label className="block mt-2">
                      <input
                        type="radio"
                        className="mr-2"
                        name="timeframe"
                        value={timeframe[1]}
                        onChange={handleTimeFrameChange}
                      />
                      {timeframe[0]}
                    </label>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1">
                <h4 className="text-gray-500 mt-4 md:ml-5">Days</h4>
                {timeFrames["DAYS"].map((timeframe, index) => (
                  <div key={index}>
                    {/* Add your checkbox group here */}
                    <label className="block mt-2">
                      <input
                        type="radio"
                        className="mr-2"
                        name="timeframe"
                        value={timeframe[1]}
                        onChange={handleTimeFrameChange}
                      />
                      {timeframe[0]}
                    </label>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default TimeframesAccordion;
