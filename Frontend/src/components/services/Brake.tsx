import React, { useEffect, useState } from 'react';
import { Button } from '../ui';
import { Check } from 'lucide-react';
import { Service } from './Type.Services';
import CarDetailsForm from './CarDetailsForm';
import { getServicesByCategory } from '../apis/Service.ts';
import { addToCart } from '../apis/Cart.ts';

const Brake: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false)
  const [selectedService, setSelectedService] = useState<string>("")
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
        setServices(await getServicesByCategory("Brake"));
    };

    if(services.length === 0) fetchServices();
  },[])
  // console.log(services);
  
  const onSubmit = (selectedCar: string) => {
    return {
      addToCart: async () => {
        try {
          const response = await addToCart(selectedService, selectedCar);
          if (response) {
            console.log('Added to cart:', response);
            closeForm();
          }
        } catch (error) {
          console.error('Error adding to cart:', error);
        }
      },
      bookNow: (): void => {
        console.log('Booked:', { service: selectedService, carDetails: selectedCar });
        closeForm();
      }
    };
  };
  
  const handleBookNow = (serviceId: string) => {
    setSelectedService(serviceId)
    setIsFormOpen(true)
  }
  
  const closeForm = () => {
    setSelectedService("")
    setIsFormOpen(false)
  }

  return (
    <div className="mx-auto max-w-7xl">
      {/* Hero Section */}
      <div className="relative h-[300px] rounded-2xl overflow-hidden mb-12">
        <img
          src="https://images.pexels.com/photos/3806249/pexels-photo-3806249.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Mechanic replacing brakes"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 flex items-center justify-center">
          <div className="p-8 md:p-12 max-w-2xl text-center">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Professional Brake Services
            </h1>
            <p className="text-md md:text-lg text-gray-200 mb-8">
              Ensure safe stopping power with our expert brake services. Regular maintenance keeps you in control.
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
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-8">
          Choose Your Brake Service
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow relative border border-gray-100`}
            >
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-1">
                {service.title}
              </h3>
              <div className="text-2xl lg:text-3xl font-bold text-blue-500 mb-3">
                Rs. {service.price}
                <span className="text-sm font-normal text-gray-500"> /service</span>
              </div>
              <ul className="space-y-4 mb-6">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
              onClick={() => handleBookNow(service._id)}
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
          Why Brake Maintenance Matters
        </h2>
        <p className="text-gray-700 mb-6 text-center max-w-3xl mx-auto">
          Your brakes handle most of your vehicle’s stopping power. Regular maintenance ensures safety, prevents damage, and keeps your ride smooth.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">
              Benefits of Brake Service
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                Enhances stopping performance
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                Extends brake system lifespan
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                Prevents rotor damage
              </li>
            </ul>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">
              Signs You Need Brake Service
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                Squeaking or grinding noises
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                Vibrating brake pedal
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                Longer stopping distances
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Book Now Section */}
      {isFormOpen && (
        <CarDetailsForm
          onSubmit={onSubmit}
          onClose={closeForm}
        />
      )}
    </div>
  );
};


export default Brake;