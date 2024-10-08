import React from "react";

const RadioButtons = () => {
  return (
    <div>
      <div id="group1" className="flex flex-row gap-3">
        <input type="radio" className="radio" name="group1" />
        <input type="radio" className="radio" name="group1" />
        <input type="radio" className="radio" name="group1" />
      </div>
    </div>
  );
};

export default RadioButtons;
