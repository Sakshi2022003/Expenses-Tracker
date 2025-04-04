import React from "react";

function Hero() {
  return (
    <section className="bg-gray-50 flex items-center flex-col text-center">
      <div className="mx-auto max-w-screen-xl px-4 py-20 sm:py-24">
        {/* Heading */}
        <div className="mx-auto max-w-xl">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-snug mb-2 text-gray-800">
            Manage Your Expenses
          </h1>
          <h2 className="text-4xl sm:text-5xl font-extrabold leading-snug mb-2 text-primary">
            Control Your Money
          </h2>

          {/* Subtext */}
          <p className="mt-2 text-lg sm:text-xl text-gray-600">
            Start Creating Your Budget & Save Tons of Money 💸💸...
          </p>

          {/* CTA Button */}
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <a
              className="block w-full sm:w-auto rounded bg-primary px-12 py-3 text-lg font-semibold text-white shadow-md hover:bg-blue-700 transition-all duration-300"
              href="/sign-in"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
