import React from 'react';
import { ChevronDown, ChevronUp, Car, Calendar, MapPin } from 'lucide-react';
import { Order } from './OrderType';
import { formatDate, getStatusColorClass } from '../../utils/formatters';

interface OrderItemProps {
  order: Order;
  isOpen: boolean;
  toggleOrder: (id: string) => void;
}

const OrderItem: React.FC<OrderItemProps> = ({ order, isOpen, toggleOrder }) => {
  // const firstItem = order.items[0];
  
  return (
    <>
    {order.items.map((firstItem)=>(<div className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md bg-white mb-4">
      {/* Order Summary Header - Always visible */}
      <div 
        className="p-4 cursor-pointer flex items-center justify-between"
        onClick={() => toggleOrder(order._id)}
      >
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <Car className="w-6 h-6 text-blue-600" />
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900">{firstItem.service.title}</h3>
            <div className="flex items-center mt-1 text-sm text-gray-500">
              <Car className="w-4 h-4 mr-1" />
              <span>{firstItem.carDetails.carMake} {firstItem.carDetails.carModel} ({firstItem.carDetails.year})</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColorClass(order.status)}`}>
            {order.status}
          </span>
          <div className="text-right">
            <p className="text-sm text-gray-500">{formatDate(order.scheduleTime.date)}</p>
            <p className="font-medium">Rs. {firstItem.service.price}</p>
          </div>
          {isOpen ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
        </div>
      </div>
      
      {/* Order Details - Visible when expanded */}
      {isOpen && (
        <div className="border-t border-gray-200 p-4 bg-gray-50 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Service Details */}
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Service Details</h4>
              <ul className="space-y-1">
                {firstItem.service.features.map((feature, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-start">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 mr-2"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Location & Schedule */}
            <div>
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                  <MapPin className="w-4 h-4 mr-1 text-gray-500" />
                  Location
                </h4>
                <p className="text-sm text-gray-600">
                  {order.location.address}, {order.location.city}, {order.location.state} {order.location.pin}, {order.location.country}
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                  <Calendar className="w-4 h-4 mr-1 text-gray-500" />
                  Schedule
                </h4>
                <p className="text-sm text-gray-600">
                  {formatDate(order.scheduleTime.date)} at {order.scheduleTime.time}
                </p>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-end mt-4 space-x-3">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
              Contact Support
            </button>
            {order.status !== "Completed" && order.status !== "Cancelled" && (
              <button className="px-4 py-2 text-sm font-medium text-white bg-red-500 border border-transparent rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 transition-colors">
                Cancel
              </button>
            )}
          </div>
        </div>
      )}
    </div>))}
    </>
  );
};

export default OrderItem;