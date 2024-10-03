import React from "react";

const RadioButtons = () => {
  return (
    <div>
      <div className="flex">
        <input
          type="radio"
          name="hs-default-radio"
          className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
          id="hs-default-radio"
        />
        <label
          htmlFor="hs-default-radio"
          className="text-sm text-gray-500 ms-2"
        >
          Default radio
        </label>
      </div>

      <div className="flex">
        <input
          type="radio"
          name="hs-default-radio"
          className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
          id="hs-checked-radio"
          defaultChecked // Menggunakan defaultChecked untuk radio button yang sudah tercentang
        />
        <label
          htmlFor="hs-checked-radio"
          className="text-sm text-gray-500 ms-2"
        >
          Checked radio
        </label>
      </div>
    </div>
  );
};

export default RadioButtons;
