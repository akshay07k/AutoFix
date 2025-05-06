import React, { useEffect, useState } from 'react';
import { CheckCircle, Calendar, MapPin, ArrowRight } from 'lucide-react';
import { Order } from './OrderType';
import { formatDate } from '../../utils/formatters';
import { Link, useParams } from 'react-router-dom';
import { getBookingById } from '../apis/Book';


const ThankYou: React.FC = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState<Order | null>(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                if(!orderId) return;
                const res = await getBookingById(orderId);
                const data = res.data;
                setOrder(data);
                // console.log(data);
            } catch (err) {
                console.error(err);
            }
        };
        if (orderId) { 
            fetchOrder();
        }
    }, [orderId]);
    // console.log(order);
    

  if (!order) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Thank You for Your Booking!</h1>
          <p className="text-lg text-gray-600">
            Your service appointment has been confirmed. 
            {/* We've sent the details to your email. */}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-900">Booking Details</h2>
          </div>
          
          <>
          {order.items.map((firstItem, index) => (
            <div className="px-6 py-6" key={index}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Service</h3>
                    <p className="text-lg font-medium text-gray-900 mb-1">
                    {firstItem?.service?.title}
                    </p>
                    <p className="text-2xl font-bold text-blue-600">
                    Rs. {firstItem?.service?.price}
                    </p>
                </div>
                
                <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Vehicle</h3>
                    <p className="text-lg font-medium text-gray-900">
                    {firstItem?.carDetails?.carMake} {firstItem?.carDetails?.carModel}
                    </p>
                    <p className="text-gray-600">
                    Year: {firstItem?.carDetails?.year} | Plate: {firstItem?.carDetails?.licensePlate}
                    </p>
                </div>

                <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Appointment
                    </h3>
                    <p className="text-lg font-medium text-gray-900">
                    {formatDate(order?.scheduleTime?.date)}
                    </p>
                    <p className="text-gray-600">{order?.scheduleTime?.time}</p>
                </div>

                <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    Location
                    </h3>
                    <p className="text-lg font-medium text-gray-900">
                    {order?.location?.city}
                    </p>
                    <p className="text-gray-600">
                    {order?.location?.address}, {order?.location?.state} {order?.location?.pin}
                    </p>
                </div>
                </div>
            </div>
          ))}
          </>
        </div>

        <div className="space-y-4">
          <Link to={'/my-orders'}>
          <button className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors">
            View All Bookings
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
          </Link>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Need help? Contact our support team at</p>
          <a href="mailto:support@autoservice.com" className="text-blue-600 hover:text-blue-800 font-medium">
            support@autoservice.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
