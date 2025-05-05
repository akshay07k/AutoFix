import React, { useEffect, useState } from 'react';
import { Button } from '../ui';
import { Check } from 'lucide-react';
import { Service } from './Type.Services';
import CarDetailsForm from './CarDetailsForm';
import axios from 'axios';
import { addToCart } from '../apis/Cart';

const Battery: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false)
  const [selectedService, setSelectedService] = useState<string>("")
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_API_URL + '/service/category/Battery');
        const data = response.data.data;

        setServices(data);

      } catch (error) {
        console.error('Error fetching services:', error);
      }
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
      }
    };
  };

  const handleBookNow = () => {
    setSelectedService(services[0]._id)
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
          src="https://images.pexels.com/photos/13065689/pexels-photo-13065689.jpeg?auto=compress&cs=tinysrgb&w=1200"
          alt="Technician replacing a car battery"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 flex items-center justify-center">
          <div className="p-8 md:p-12 max-w-2xl text-center">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Battery Replacement Service
            </h1>
            <p className="text-md md:text-lg text-gray-200 mb-8">
              Power up your vehicle with our reliable battery replacement service. A fresh battery keeps you going.
            </p>
            <div className='flex items-center justify-center'>
                <Button 
                onClick={() => handleBookNow()}
                className='bg-blue-600/80 text-white px-8 py-3 rounded-lg text-md lg:text-lg font-semibold hover:bg-blue-700'>
                Book Now!
                </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Service Packages */}
      <section className="mb-16">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-8">
          Your Battery Replacement Option
        </h2>
        <div className="grid md:grid-cols-1 gap-8 mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow relative border border-gray-100"
            >
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                {service.title}
              </h3>
              <div className="text-2xl lg:text-3xl font-bold text-blue-500 mb-6">
                Rs. {service.price}
                <span className="text-sm font-normal text-gray-500"> /service</span>
              </div>
              <ul className="space-y-4 mb-8 flex flex-wrap gap-4">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Informative Section */}
      <section className="mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
          Why Battery Replacement Matters
        </h2>
        <p className="text-gray-700 mb-6 text-center max-w-3xl mx-auto">
          A new battery ensures your car starts reliably and powers all electrical systems. Don’t get stranded—replace it on time.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">
              Benefits of Battery Replacement
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                Reliable engine starts
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                Supports electrical components
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                Prevents roadside breakdowns
              </li>
            </ul>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">
              Signs You Need a New Battery
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                Slow engine cranking
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                Dim headlights
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                Battery warning light on
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

export default Battery;