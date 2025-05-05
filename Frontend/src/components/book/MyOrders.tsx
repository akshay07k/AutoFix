import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface OrderItem {
  name: string;
  quantity: number;
}

type Order = {
  _id: string;
  date: string;
  total: number;
  status: 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed';
  items: OrderItem[];
};

const MyOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/book/getBookingsByUser/681745b1acb7016e929527da`);
        setOrders(res.data.data);
      } catch (err) {
        setError('Failed to load orders.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const statusColor = (status: Order['status']) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Confirmed': return 'bg-blue-100 text-blue-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) return <div className="text-center py-20 text-gray-600">Loading your orders...</div>;
  if (error) return <div className="text-center py-20 text-red-600">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">My Orders</h1>
      {orders.length === 0 ? (
        <p className="text-center text-gray-600">You have no orders yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {orders.map(order => (
            <div key={order._id} className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500">Order #{order._id.slice(-6)}</span>
                  <span className={`px-2 py-1 text-xs font-medium rounded ${statusColor(order.status)}`}> {order.status} </span>
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{new Date(order.date).toLocaleDateString()}</h2>
                <ul className="mb-4 space-y-1">
                  {order.items.slice(0, 3).map((item, idx) => (
                    <li key={idx} className="text-gray-700 text-sm">
                      {item.name} x{item.quantity}
                    </li>
                  ))}
                  {order.items.length > 3 && <li className="text-gray-500 text-sm">and {order.items.length - 3} more...</li>}
                </ul>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-bold text-gray-800">₹{order.total}</span>
                <button className="text-sm text-blue-600 hover:underline focus:outline-none">Details</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
