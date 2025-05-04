import React, { useEffect, useState } from 'react';
import { Button } from '../ui';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { FormData } from './Type.Services';
import axios from 'axios';

interface CarDetailsFormProps {
  onSubmit: (selectedCar: string) => {
    addToCart: () => void;
    bookNow: () => void;
  };
  onClose: () => void;
}

const CarDetailsForm: React.FC<CarDetailsFormProps> = ({ onSubmit, onClose }) => {

  const [x, setX] = useState<number>(0);
  const [myCars, setMyCars] = useState<FormData[] | []>([]);
  const [selectedCar, setSelectedCar] = useState<string>("");

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_API_URL + '/user/getAllCars' + '/681745b1acb7016e929527da');

        setMyCars(response.data.data);
      } catch (error) {
        throw new Error('Error fetching cars'+ error);
      }
    }

    if(myCars.length === 0) fetchCars();
  }, [])
  console.log(myCars);
  


  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      carMake: '',
      carModel: '',
      year: '',
      licensePlate: '',
    },
  });

  const addNewCar = async (data: FormData) => {
    try {
      const response = await axios.post(import.meta.env.VITE_API_URL + '/user/addCar' + '/681745b1acb7016e929527da', data);

      const newData = response.data.data;
      setMyCars((prevCars) => [...prevCars, newData]);
      reset();
      setX(0);
    } catch (error) {
      console.error('Error adding car:', error);
    }
  };

  const handleFormClose = () => {
    onClose();
    reset();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl relative min-h-[550px]">
        <button
          onClick={handleFormClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-6 w-6" />
        </button>

        <div className='mb-6 flex gap-4'>
          <button
          className={`${x == 0 && 'bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-semibold'}`}
          onClick={() => setX(0)}
          >My Cars</button>
          <button
          className={`${x == 1 && 'bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-semibold'}`}
          onClick={() => setX(1)}
          >Add New Car</button>
        </div>

        {x == 0 && (
          <div>
            <div className="space-y-4 overflow-auto h-[340px] bg-gray-50 py-4 mb-6">
              {myCars.map((car, index) => (
                <button 
                onClick={() => setSelectedCar(car._id)}
                key={index} className={`border-b border-gray-300 py-4 w-full text-left rounded-lg px-4 hover:bg-gray-100 transition duration-200 cursor-pointer ${selectedCar === car._id ? 'bg-blue-100 text-blue-700' : ''}`}>
                    {car.carMake} {car.carModel} ({car.year}) - {car.licensePlate}
                </button>
              ))}
              {myCars.length === 0 && (
                <div className="text-center text-gray-500 py-40">
                  No car found. Please add a new car.
                  </div>
              )}
            </div>

            <div className="flex gap-4">
              <Button
                type="button"
                onClick={() => onSubmit(selectedCar).addToCart()}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-semibold"
              >
                Add to Cart
              </Button>
              <Button
                type="button"
                onClick={() => onSubmit(selectedCar).bookNow()}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold"
              >
                Book Now
              </Button>
            </div>
          </div>
        )}  

        {x == 1 && (<form className="space-y-6">
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
                max: { value: new Date().getFullYear(), message: 'Year cannot be in the future' },
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

          {/* //asdf */}
          <Button
                type="button"
                onClick={handleSubmit((data: FormData) => addNewCar(data))}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold px-2"
              >
                Add New Car
          </Button>
        </form>)}
      </div>
    </div>
  );
};

export default CarDetailsForm;