import React, { useEffect, useState } from 'react'
import {
  UserCog,
  IndianRupee,
  ShoppingBag,
  UserCheck,
} from 'lucide-react';
import { getBookingStats, getMechanicStats, getRecentBookings, getUserStats } from '../apis/Dashboard';

const Dashboard: React.FC = () => {

  const [stats, setStats] = useState([
    { title: 'Total Revenue', value: 'Loading...', icon: IndianRupee },
    { title: 'Active Users', value: 'Loading...', icon: UserCheck },
    { title: 'Total Orders', value: 'Loading...', icon: ShoppingBag },
    { title: 'Total Mechanics', value: 'Loading...', icon: UserCog },
  ]);
    
      const [recentOrders, setRecentOrders] = useState([
        { id: '#1234', customer: 'John Doe', status: 'Completed', amount: '234.50', date: '2024-03-10' },
        { id: '#1235', customer: 'Jane Smith', status: 'Pending', amount: '129.99', date: '2024-03-09' },
        { id: '#1236', customer: 'Robert Johnson', status: 'Processing', amount: '549.00', date: '2024-03-09' },
        { id: '#1237', customer: 'Emily Brown', status: 'Completed', amount: '89.99', date: '2024-03-08' },
      ]);

    useEffect(() => {
      const fetchStats = async () => {
        try {
          const [bookingDetails, userDetails, mechanicDetails] = await Promise.all([
            getBookingStats(),
            getUserStats(),
            getMechanicStats(),
          ]);

          setStats((prevStats) => [
            { ...prevStats[0], value: `Rs. ${bookingDetails?.totalRevenue || 0}` },
            { ...prevStats[1], value: userDetails?.totalUsers || 0 },
            { ...prevStats[2], value: bookingDetails?.totalOrders || 0 },
            { ...prevStats[3], value: mechanicDetails?.count || 0 },
          ]);
        } catch (error) {
          console.error('Error fetching stats:', error);
        }
      };

      if (stats[0].value === 'Loading...') {
        fetchStats();
      }
    }, [stats]);
    // console.log(stats);

    useEffect(() => {
      const fetchRecentBookings = async () => {
        try {
          const response = await getRecentBookings();
          setRecentOrders(() => [
            ...response.map((order: any) => ({
              id: order._id,
              customer: order.name,
              status: order.status,
              amount: order.totalAmount,
              date: new Date(order.createdAt).toLocaleDateString(),
            })),
          ]);
        } catch (error) {
          console.error('Error fetching recent bookings:', error);
        }
      };
      fetchRecentBookings();
    }, []);
    

  return (
    <>
        <div className="flex-1 overflow-y-auto p-4 lg:p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl p-4 lg:p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-semibold ${index%2 == 0 ? "text-green-500" : "text-blue-500"}`}>{stat.title}</p>
                    <h3 className={`text-xl lg:text-2xl font-bold mt-1 ${stat.value == "Loading..." ? "text-sm font-light" : ""}`}>{stat.value}</h3>
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <stat.icon className="h-6 w-6 text-gray-700" />
                  </div>
                </div>
                <div className={`mt-4 text-sm text-green-600`}>
                  
                </div>
              </div>
            ))}
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                      Order ID
                    </th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                      Customer
                    </th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                      Status
                    </th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                      Amount
                    </th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentOrders.map((order, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {order.id}
                      </td>
                      <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.customer}
                      </td>
                      <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                          ${order.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                          order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          order.status === 'Cancelled' ? 'bg-red-100 text-red-800' : 
                          'bg-blue-100 text-blue-800'}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Rs. {order.amount}
                      </td>
                      <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
    </>
  )
}

export default Dashboard