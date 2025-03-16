import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { MapPin, Calendar, ChevronRight, Car, PenTool as Tools, Check } from 'lucide-react';
import { BookingData, Location, CartItem } from '../services/Type.Services'


const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM',
];

function App() {
  const [step, setStep] = useState<number>(2); 
  
  const [cartItems] = useState<CartItem[]>([
    {
      service: {
        title: 'Regular Oil Change',
        price: '599',
        features: ['Conventional oil', 'Oil filter replacement', 'Basic vehicle inspection', '4,000 Km/5 month warranty'],
      },
      carDetails: {
        carMake: 'Toyota',
        carModel: 'Corolla',
        year: '2020',
        licensePlate: 'ABC-123',
      },
    },
    {
      service: {
        title: 'Brake Service',
        price: '1299',
        features: ['Brake pad replacement', 'Rotor inspection', 'Brake fluid check', '10,000 Km warranty'],
      },
      carDetails: {
        carMake: 'Honda',
        carModel: 'Civic',
        year: '2021',
        licensePlate: 'XYZ-789',
      },
    },
  ]);

  const [bookingDetails, setBookingDetails] = useState<BookingData>({
    location: undefined,
    schedule: { date: '', time: '' },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Location>({
    defaultValues: bookingDetails.location || {
      address: '',
      city: '',
      state: '',
      pin: '',
      country: 'India',
    },

  });

  const onSubmit: SubmitHandler<Location> = (data) => {
    setBookingDetails((prev) => ({ ...prev, location: {...data} }));
    setStep(3);
  };

  const handleDateSelect = (date: string) => {
    setBookingDetails((prev) => ({
      ...prev,
      schedule: { ...prev.schedule!, date },
    }));
  };

  const handleTimeSelect = (time: string) => {
    setBookingDetails((prev) => ({
      ...prev,
      schedule: { ...prev.schedule!, time },
    }));
    if (bookingDetails.schedule?.date) {
      setTimeout(() => setStep(4), 500);
    }
  };

  const calculateTotal = (): number => {
    return cartItems.reduce((total, item) => total + parseInt(item.service.price), 0);
  };

  const handleConfirm = () => {
    alert('Booking confirmed! We will send you a confirmation email shortly.');
    console.log("bookingDetails", bookingDetails);
    console.log("cartItems", cartItems);
    
    setStep(2);
    setBookingDetails({ location: undefined, schedule: { date: '', time: '' } });
    reset();
  };

  return (
    <div className="bg-gray-50 md:py-12">
      <div className="container mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="flex items-center justify-center mb-8 space-x-1 md:space-x-4">
          {[
            { step: 1, icon: Tools, label: 'Services' },
            { step: 2, icon: MapPin, label: 'Location' },
            { step: 3, icon: Calendar, label: 'Schedule' },
            { step: 4, icon: Check, label: 'Confirm' },
          ].map((item, index) => (
            <React.Fragment key={item.step}>
              <div className={`flex items-center ${step >= item.step ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className="w-5 md:w-10 h-5 md:h-10 rounded-full flex items-center justify-center border-2 border-current bg-white">
                  <item.icon className="w-2.5 md:w-5 h-2.5 md:h-5" />
                </div>
                <span className="ml-2 text-xs md:text-md lg:text-lg md:font-medium">{item.label}</span>
              </div>
              {index < 3 && (
                <div className={`w-16 h-1 ${step > item.step ? 'bg-blue-600' : 'bg-gray-200'}`} />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Cart Summary */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Service Cart</h2>
            <div className="space-y-4">
              {cartItems.map((item, index) => (
                <div key={index} className="flex items-start justify-between border-b pb-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <h3 className="font-medium text-lg text-gray-700">{item.service.title}</h3>
                      <p className="font-semibold text-blue-600">₹{item.service.price}</p>
                    </div>
                    <div className="mt-2 flex items-center text-gray-600">
                      <Car className="w-4 h-4 mr-2" />
                      <p>{item.carDetails.year} {item.carDetails.carMake} {item.carDetails.carModel}</p>
                    </div>
                    <p className="text-sm text-gray-500">License: {item.carDetails.licensePlate}</p>
                  </div>
                </div>
              ))}
              <div className="flex justify-between pt-4 text-lg font-semibold text-gray-800 border-t">
                <span>Total Amount</span>
                <span>₹{calculateTotal()}</span>
              </div>
            </div>
          </div>

          {/* Step Content */}
          <div className="space-y-6">
            {step === 2 && (
              <div>
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add Service Location</h2>
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">Add New Location</h3>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <input
                          type="text"
                          {...register('address', { required: 'Address is required' })}
                          placeholder="Address"
                          className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.address && (
                          <p className="text-red-500 text-sm">{errors.address.message}</p>
                        )}
                      </div>
                      <div>
                        <input
                          type="text"
                          {...register('city', { required: 'City is required' })}
                          placeholder="City"
                          className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.city && (
                          <p className="text-red-500 text-sm">{errors.city.message}</p>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <input
                          type="text"
                          {...register('state', { required: 'State is required' })}
                          placeholder="State"
                          className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.state && (
                          <p className="text-red-500 text-sm">{errors.state.message}</p>
                        )}
                      </div>
                      <div>
                        <input
                          type="text"
                          {...register('pin', { required: 'Pin/Zip Code is required' })}
                          placeholder="Pin/Zip Code"
                          className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.pin && (
                          <p className="text-red-500 text-sm">{errors.pin.message}</p>
                        )}
                      </div>
                    </div>
                    <div>
                      <input
                        type="text"
                        {...register('country', { required: 'Country is required' })}
                        placeholder="Country"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {errors.country && (
                        <p className="text-red-500 text-sm">{errors.country.message}</p>
                      )}
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Add Location and Proceed
                    </button>
                  </form>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">Schedule Services</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Select Date</label>
                    <input
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={bookingDetails.schedule?.date || ''}
                      onChange={(e) => handleDateSelect(e.target.value)}
                    />
                  </div>

                  {bookingDetails.schedule?.date && (
                    <div>
                      <label className="block text-gray-700 mb-2 font-medium">Select Time</label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {timeSlots.map((time) => (
                          <button
                            key={time}
                            className={`p-2 rounded-lg border text-sm ${
                              bookingDetails.schedule?.time === time
                                ? 'bg-blue-600 text-white'
                                : 'hover:bg-gray-100 text-gray-700'
                            }`}
                            onClick={() => handleTimeSelect(time)}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">Confirm Booking</h2>
                <div className="space-y-6">
                  <div className="border-b pb-4">
                    <h3 className="font-medium text-lg mb-2 text-gray-700">Selected Location</h3>
                    <p className="text-gray-500 text-md">
                      {bookingDetails.location?.address}, {bookingDetails.location?.city},{' '}
                      {bookingDetails.location?.state} {bookingDetails.location?.pin},{' '}
                      {bookingDetails.location?.country}
                    </p>
                  </div>

                  <div className="border-b pb-4">
                    <h3 className="font-medium text-lg mb-2 text-gray-700">Schedule</h3>
                    <p className="text-gray-600">
                      Date: {new Date(bookingDetails.schedule?.date || '').toLocaleDateString()}
                    </p>
                    <p className="text-gray-600">Time: {bookingDetails.schedule?.time}</p>
                  </div>

                  <button
                    onClick={handleConfirm}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    Confirm Booking
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </button>
                </div>
              </div>
            )}

            {step > 2 && (
              <button
                onClick={() => setStep(step - 1)}
                className="mt-6 text-gray-600 hover:text-gray-800 font-medium flex items-center"
              >
                ← Back to {step === 3 ? 'Location' : 'Schedule'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;