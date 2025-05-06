import React, { useEffect, useState } from 'react';
import { Search, Filter, RefreshCw } from 'lucide-react';
import OrderItem from './OrderItem';
import { Order } from './OrderType';
import { getBookingsByUser } from '../apis/Book';

const OrderHistory: React.FC = () => {
  const [orders, setOrders] = useState<Order[] | []>([]);
  const [openOrderId, setOpenOrderId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchOrders = async () => {
        try {
            const res = await getBookingsByUser();
            setOrders(res.data);
        } catch (err) {
            console.error(err);
        } 
    };
    if(orders.length === 0) fetchOrders();
  }
  , []);

  const toggleOrder = (id: string) => {
    setOpenOrderId(openOrderId === id ? null : id);
  };

  const filteredOrders = orders.filter(order => {
    // Filter by status
    if (filterStatus !== 'All' && order.status !== filterStatus) {
      return false;
    }
    
    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const carDetails = order.items[0].carDetails;
      const carInfo = `${carDetails.carMake} ${carDetails.carModel} ${carDetails.licensePlate}`.toLowerCase();
      const serviceInfo = order.items[0].service.title.toLowerCase();
      
      return carInfo.includes(searchLower) || serviceInfo.includes(searchLower);
    }
    
    return true;
  });

  return (
    <div className="mx-auto px-4 py-8 bg-white w-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Your Orders</h1>
        <button 
          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <RefreshCw className="w-4 h-4 mr-1" />
          <span>Refresh</span>
        </button>
      </div>
      
      {/* Search & Filter Controls */}
      <div className="mb-6 flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by car or service"
            className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Filter className="h-5 w-5 text-gray-400" />
          </div>
          <select
            className="block w-full pl-10 pr-8 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 appearance-none"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ChevronDownIcon className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>
      
      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <OrderItem 
              key={order._id} 
              order={order} 
              isOpen={order._id === openOrderId}
              toggleOrder={toggleOrder}
            />
          ))
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper component for the dropdown icon
const ChevronDownIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 20 20" 
    fill="currentColor" 
    className={className}
  >
    <path 
      fillRule="evenodd" 
      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
      clipRule="evenodd" 
    />
  </svg>
);

export default OrderHistory;

