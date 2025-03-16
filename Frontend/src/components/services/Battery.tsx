import React, { useState } from 'react';
import { Button } from '../ui';
import { Check, X } from 'lucide-react';
import { FormData, Service } from './Type.Services';
import { useForm } from 'react-hook-form';

const Battery: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false)
  const [selectedService, setSelectedService] = useState<Service | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>({
    defaultValues: {
      carMake: '',
      carModel: '',
      year: '',
      licensePlate: ''
    }
  })

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

  const handleBookNow = () => {
    setSelectedService(services[0])
    setIsFormOpen(true)
  }
  
  const closeForm = () => {
    setIsFormOpen(false)
    setSelectedService(null)
    reset()
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
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-2xl p-6 w-full max-w-md shadow-xl relative'>
            <button
              onClick={closeForm}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>

            <h2 className='text-2xl font-bold text-gray-800 mb-6'>Vehicle Details</h2>

            <form className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Car Make <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('carMake', { required: 'Car make is required' })}
                  className={`w-full px-4 py-2 rounded-lg border ${errors.carMake ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="Toyota"
                />
                {errors.carMake && (
                  <p className="text-red-500 text-xs">{errors.carMake.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Car Model <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('carModel', { required: 'Car model is required' })}
                  className={`w-full px-4 py-2 rounded-lg border ${errors.carModel ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="Corolla"
                />
                {errors.carModel && (
                  <p className="text-red-500 text-xs">{errors.carModel.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Year <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  {...register('year', { 
                    required: 'Year is required',
                    min: { value: 1900, message: 'Year must be after 1900' },
                    max: { value: new Date().getFullYear(), message: 'Year cannot be in the future' }
                  })}
                  className={`w-full px-4 py-2 rounded-lg border ${errors.year ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="2020"
                />
                {errors.year && (
                  <p className="text-red-500 text-xs">{errors.year.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  License Plate <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('licensePlate', { required: 'License plate is required' })}
                  className={`w-full px-4 py-2 rounded-lg border ${errors.licensePlate ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="ABC-123"
                />
                {errors.licensePlate && (
                  <p className="text-red-500 text-xs">{errors.licensePlate.message}</p>
                )}
              </div>

              <div className="flex gap-4">
                <Button
                  type="button"
                  onClick={handleSubmit((data: FormData) => onSubmit(data).addToCart())}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-semibold"
                >
                  Add to Cart
                </Button>
                <Button
                  type="button"
                  onClick={handleSubmit((data: FormData) => onSubmit(data).bookNow())}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold"
                >
                  Book Now
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const services: Service[] = [
  {
    title: 'Battery Replacement',
    price: '2499',
    features: [
      'New high-quality battery',
      'Professional installation',
      'Old battery disposal',
    ],
  },
];

export default Battery;