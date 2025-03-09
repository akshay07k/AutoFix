import React, { useState } from 'react'
import {
    AlertCircle,
    Calendar,
    CheckCircle,
    Clock,
    DollarSign,
    MapPin,
    Users,
    XCircle
} from 'lucide-react'

const Orders: React.FC = () => {

    const [selectedFilter, setSelectedFilter] = useState('all');

    const getStatusIcon = (status: string) => {
        switch (status) {
          case 'completed':
            return <CheckCircle className="h-5 w-5 text-green-500" />;
          case 'cancelled':
            return <XCircle className="h-5 w-5 text-red-500" />;
          case 'in-progress':
            return <Clock className="h-5 w-5 text-blue-500" />;
          case 'pending':
            return <AlertCircle className="h-5 w-5 text-yellow-500" />;
          default:
            return null;
        }
    };
    
    const getStatusClass = (status: string) => {
        switch (status) {
          case 'completed':
            return 'bg-green-100 text-green-800';
          case 'cancelled':
            return 'bg-red-100 text-red-800';
          case 'in-progress':
            return 'bg-blue-100 text-blue-800';
          case 'pending':
            return 'bg-yellow-100 text-yellow-800';
          default:
            return 'bg-gray-100 text-gray-800';
        }
    };
    
    const filteredOrders = orders.filter(order => {
        if (selectedFilter === 'all') return true;
        return order.status === selectedFilter;
    });

  return (
    <div className="flex-1 overflow-y-auto p-4 lg:p-6">
        {/* Filters */}
        <div className="mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className='flex items-center mb-4 sm:mb-0'>
                <h1 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">Orders</h1>
                <span className="text-sm text-gray-500 ml-2">
                ({filteredOrders.length} orders)
                </span>
            </div>
            <div className="flex items-center space-x-2 overflow-x-auto pb-2 sm:pb-0">
                {filters.map(filter => (
                <button
                    key={filter.id}
                    onClick={() => setSelectedFilter(filter.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap
                    ${selectedFilter === filter.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                >
                    {filter.label}
                </button>
                ))}
            </div>
            </div>
        </div>

        {/* Orders List */}
        <div className="grid grid-cols-1 gap-4">
            {filteredOrders.map(order => (
            <div key={order.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center">
                    <img
                        src={order.customerImage}
                        alt={order.customerName}
                        className="h-12 w-12 rounded-full object-cover"
                    />
                    <div className="ml-4">
                        <h3 className="text-lg font-semibold text-gray-900">{order.customerName}</h3>
                        <p className="text-sm text-gray-500">{order.service}</p>
                    </div>
                    </div>
                    <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 ${getStatusClass(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                    <span className="text-lg font-semibold text-gray-900 flex items-center">
                        <DollarSign className="h-5 w-5 text-gray-500" />
                        {order.amount.toFixed(2)}
                    </span>
                    </div>
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-5 w-5 flex-shrink-0 mr-2" />
                    <span>{order.scheduledDate}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-5 w-5 flex-shrink-0 mr-2" />
                    <span>{order.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                    <Users className="h-5 w-5 flex-shrink-0 mr-2" />
                    <span>Assigned to: {order.mechanic}</span>
                    </div>
                </div>
                <div className='flex items-center justify-between flex-wrap gap-4'>
                    {order.notes && (
                        <div className="mt-4 text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                        {order.notes}
                        </div>
                    )}
                    <div className='lg:mt-8'>
                        <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                            View Details
                        </button>
                        <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200">
                            Update Status
                        </button>
                    </div>
                </div>
                </div>
            </div>
            ))}
        </div>
    </div>
  )
}

export default Orders

const orders = [
    {
      id: 'ORD-2024-001',
      customerName: 'James Wilson',
      service: 'Engine Repair',
      mechanic: 'John Smith',
      scheduledDate: '2024-03-15 10:00 AM',
      status: 'completed',
      amount: 450.00,
      location: 'Downtown Workshop',
      customerImage: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
      notes: 'Complete engine overhaul'
    },
    {
      id: 'ORD-2024-002',
      customerName: 'Emily Brown',
      service: 'Oil Change',
      mechanic: 'Maria Rodriguez',
      scheduledDate: '2024-03-15 02:30 PM',
      status: 'in-progress',
      amount: 75.00,
      location: 'West Side Garage',
      customerImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
      notes: 'Regular maintenance'
    },
    {
      id: 'ORD-2024-003',
      customerName: 'Michael Chen',
      service: 'Brake Replacement',
      mechanic: 'David Chen',
      scheduledDate: '2024-03-16 09:15 AM',
      status: 'pending',
      amount: 280.00,
      location: 'East End Auto',
      customerImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
      notes: 'Front brake pads replacement'
    },
    {
      id: 'ORD-2024-004',
      customerName: 'Sarah Johnson',
      service: 'Transmission Service',
      mechanic: 'Michael Brown',
      scheduledDate: '2024-03-16 11:30 AM',
      status: 'cancelled',
      amount: 850.00,
      location: 'Central Auto Care',
      customerImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
      notes: 'Customer rescheduled'
    },
    {
      id: 'ORD-2024-005',
      customerName: 'Robert Taylor',
      service: 'AC Repair',
      mechanic: 'Sarah Johnson',
      scheduledDate: '2024-03-15 04:00 PM',
      status: 'in-progress',
      amount: 320.00,
      location: 'North Side Service',
      customerImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
      notes: 'AC compressor replacement'
    }
  ];

  const filters = [
    { id: 'all', label: 'All Orders' },
    { id: 'pending', label: 'Pending' },
    { id: 'in-progress', label: 'In Progress' },
    { id: 'completed', label: 'Completed' },
    { id: 'cancelled', label: 'Cancelled' }
  ];