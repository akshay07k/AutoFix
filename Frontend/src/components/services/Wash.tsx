import React, { useState } from 'react';
import { Button } from '../ui';
import { Check } from 'lucide-react';
import { FormData, Service } from './Type.Services';
import CarDetailsForm from './CarDetailsForm';

const Wash: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const handleBookNow = (service: Service): void => {
    setSelectedService(service);
    setIsFormOpen(true);
  };

  const onSubmit = (data: FormData) => {
    return {
      addToCart: (): void => {
        console.log('Added to cart:', { service: selectedService, carDetails: {...data} });
        closeForm();
      },
      bookNow: (): void => {
        console.log('Booked:', { service: selectedService, carDetails: {...data} });
        closeForm();
      }
    };
  };

  const closeForm = (): void => {
    setSelectedService(null);
    setIsFormOpen(false);
  };

  return (
    <div className="mx-auto max-w-7xl">
      {/* Hero Section */}
      <div className="relative h-[300px] rounded-2xl overflow-hidden mb-12">
        <img
          src="https://images.pexels.com/photos/4022545/pexels-photo-4022545.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Sparkling clean car after a wash"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 flex items-center justify-center">
          <div className="p-8 md:p-12 max-w-2xl text-center">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Professional Car Washing Services
            </h1>
            <p className="text-md md:text-lg text-gray-200 mb-8">
              Keep your car looking its best with our washing services. A clean car is a happy car!
            </p>
            {/* <div className='flex items-center justify-center'>
                <Button className='bg-blue-600/80 text-white px-8 py-3 rounded-lg text-md lg:text-lg font-semibold hover:bg-blue-700'>
                Book Now!
                </Button>
            </div> */}
          </div>
        </div>
      </div>

      {/* Service Packages */}
      <section className="mb-16">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-8 text-center">
          Choose Your Wash Package
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow relative ${service.recommended ? "border-2 border-blue-500" : "border border-gray-100"}`}
            >
              {service.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm">
                  Recommended
                </div>
              )}
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                {service.title}
              </h3>
              <div className="text-2xl lg:text-3xl font-bold text-blue-500 mb-6">
                Rs. {service.price}
                <span className="text-sm font-normal text-gray-500"> /service</span>
              </div>
              <ul className="space-y-4 mb-8">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
              onClick={() => handleBookNow(service)}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold">
                Book This Package
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Informative Section */}
      <section className="mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
          Why Regular Washing Matters
        </h2>
        <p className="text-gray-700 mb-6 text-center max-w-3xl mx-auto">
          Regular car washing protects your vehicle’s finish, prevents damage, and keeps it looking great inside and out.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">
              Benefits of Washing
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                Protects paint from corrosion
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                Maintains resale value
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                Improves visibility with clean windows
              </li>
            </ul>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">
              Signs Your Car Needs a Wash
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                Visible dirt or grime buildup
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                Dusty or stained interior
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                Cloudy windows or mirrors
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Modal */}
      {isFormOpen && (
        <CarDetailsForm 
          onSubmit={onSubmit} 
          onClose={closeForm}
        />
      )}
    </div>
  );
};

const services: Service[] = [
  {
    title: 'Interior Wash',
    price: '499',
    features: [
      'Vacuuming of seats and carpets',
      'Dashboard and console wipe-down',
      'Interior window cleaning',
    ],
  },
  {
    title: 'Exterior Wash',
    price: '299',
    features: [
      'Soap wash and rinse',
      'Wheel cleaning',
      'Quick dry',
    ],
  },
  {
    title: 'Interior & Exterior Wash',
    price: '699',
    recommended: true,
    features: [
      'Full interior vacuum and wipe-down',
      'Complete exterior wash',
      'Window cleaning inside and out',
    ],
  },
];

export default Wash;