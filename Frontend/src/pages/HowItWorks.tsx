import React from "react";

const HowItWorks: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <div className="bg-gray-800 text-white py-6">
        <h1 className="text-3xl font-bold text-center">How It Works</h1>
      </div>

      <main className="px-6 py-10 md:px-16">
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-center mb-6">Step-by-Step Process</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white shadow-lg hover:shadow-xl duration-300 ease-in-out rounded-xl p-6 text-center">
              <div className="text-blue-600 text-4xl mb-4">1</div>
              <h3 className="text-lg font-bold mb-2">Sign Up</h3>
              <p>Create an account and log in to access all features.</p>
            </div>

            <div className="bg-white shadow-lg hover:shadow-xl duration-300 ease-in-out rounded-xl p-6 text-center">
              <div className="text-blue-600 text-4xl mb-4">2</div>
              <h3 className="text-lg font-bold mb-2">Browse Services</h3>
              <p>Explore the available services and choose what you need.</p>
            </div>

            <div className="bg-white shadow-lg hover:shadow-xl duration-300 ease-in-out rounded-xl p-6 text-center">
              <div className="text-blue-600 text-4xl mb-4">3</div>
              <h3 className="text-lg font-bold mb-2">Book a Service</h3>
              <p>Schedule a service at your convenience with just a click.</p>
            </div>
          </div>
        </section>

        <section className="bg-blue-50 py-10 px-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-center mb-6">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-center">
              <span className="text-blue-600 text-4xl mr-4">✔</span>
              <p>Reliable and trusted service providers.</p>
            </div>
            <div className="flex items-center">
              <span className="text-blue-600 text-4xl mr-4">✔</span>
              <p>Affordable and transparent pricing.</p>
            </div>
            <div className="flex items-center">
              <span className="text-blue-600 text-4xl mr-4">✔</span>
              <p>24/7 customer support for all your needs.</p>
            </div>
            <div className="flex items-center">
              <span className="text-blue-600 text-4xl mr-4">✔</span>
              <p>Quick and easy booking process.</p>
            </div>
          </div>
        </section>
      </main>

    </div>
  );
};

export default HowItWorks;
