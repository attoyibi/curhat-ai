import React from "react";

const HeroSection = () => {
  return (
    <div className="py-[100px] px-3 bg-white dark:bg-darkBackground">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid */}
        <div className="grid lg:grid-cols-7 lg:gap-x-8 xl:gap-x-12 lg:items-center">
          <div className="lg:col-span-3">
            <h1 className="block text-3xl font-bold text-gray-800 dark:text-darkPrimary sm:text-4xl md:text-5xl lg:text-6xl">
              Share Your Thoughts, Feel at Ease
            </h1>
            <p className="mt-3 text-lg text-gray-800 dark:text-gray-200">
              Curhat AI is here to listen and help lighten your emotional load. Share your experiences, and let our AI provide a comforting space for your thoughts.
            </p>

            <div className="mt-5 lg:mt-8 flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
              <div className="w-full sm:w-auto">
                <label htmlFor="hero-input" className="sr-only">
                  Search
                </label>
                <input
                  type="text"
                  id="hero-input"
                  name="hero-input"
                  className="py-3 px-4 block w-full min-w-80 border border-gray-200 dark:border-gray-700 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:text-white"
                  placeholder="Enter work email"
                />
              </div>
              <a
                className="w-full sm:w-auto py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                href="#"
              >
                Start Register
              </a>
            </div>

            {/* Brands */}
            <div className="mt-6 lg:mt-12">
              {/* <span className="text-xs font-medium text-gray-800 dark:text-gray-200 uppercase">
                Trusted by:
              </span> */}

              <div className="mt-4 flex gap-x-8">
                {/* Add brand logos here if needed */}
              </div>
            </div>
            {/* End Brands */}
          </div>
          {/* End Col */}

          <div className="lg:col-span-4 mt-10 lg:mt-0">
            <img
              className="w-full rounded-xl"
              src="https://images.unsplash.com/photo-1665686376173-ada7a0031a85?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=900&h=700&q=80"
              alt="Hero Image"
            />
          </div>
          {/* End Col */}
        </div>
        {/* End Grid */}
      </div>
    </div>
  );
};

export default HeroSection;
