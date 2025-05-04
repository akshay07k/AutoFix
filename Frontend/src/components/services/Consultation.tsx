import React, { useEffect, useState } from 'react';
import { Button } from '../ui';
import { Check } from 'lucide-react';
import { Service } from './Type.Services';
import CarDetailsForm from './CarDetailsForm';
import { getServicesByCategory } from '../apis/Service';
import { addToCart } from '../apis/Cart';

const Consultation: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false)
  const [selectedService, setSelectedService] = useState<string>("")
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
        setServices(await getServicesByCategory("Consultation"));
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
          src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1920&q=80"
          alt="Mechanic discussing with customer"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 flex items-center justify-center">
          <div className="p-8 md:p-12 max-w-2xl text-center">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Expert Car Consultation
            </h1>
            <p className="text-md md:text-lg text-gray-200 mb-8">
              Get personalized advice and inspections from our pros. Keep your car in top shape with expert guidance.
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
        Book Your Consultation
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
          Why Consultations Matter
        </h2>
        <p className="text-gray-700 mb-6 text-center max-w-3xl mx-auto">
          A consultation provides expert insight into your vehicle’s condition, helping you plan maintenance and avoid surprises.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">
              Benefits of a Consultation
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                Identifies potential issues early
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                Provides tailored maintenance advice
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                Enhances vehicle safety
              </li>
            </ul>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">
              When to Book a Consultation
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                Unusual noises or vibrations
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                Dashboard warning lights
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                Before a long trip
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


export default Consultation;