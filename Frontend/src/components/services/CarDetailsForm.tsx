import React from 'react';
import { Button } from '../ui';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { FormData } from './Type.Services';

interface CarDetailsFormProps {
  onSubmit: (data: FormData) => {
    addToCart: () => void;
    bookNow: () => void;
  };
  onClose: () => void;
}

const CarDetailsForm: React.FC<CarDetailsFormProps> = ({ onSubmit, onClose }) => {
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

  const handleFormClose = () => {
    onClose();
    reset();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl relative">
        <button
          onClick={handleFormClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-6">Vehicle Details</h2>

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
  );
};

export default CarDetailsForm;