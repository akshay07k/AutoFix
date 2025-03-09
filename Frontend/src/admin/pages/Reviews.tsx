import React, { useState } from 'react'
import {
    Calendar,
    CheckCircle,
    Flag,
    MessageSquare,
    MoreVertical,
    Star,
    StarOff,
    ThumbsUp,
    XCircle
} from 'lucide-react'

const Reviews: React.FC = () => {
    const [selectedFilter, setSelectedFilter] = useState('all');

    const getStatusClass = (status: string) => {
        switch (status) {
        case 'published':
            return 'bg-green-100 text-green-800';
        case 'pending':
            return 'bg-yellow-100 text-yellow-800';
        case 'flagged':
            return 'bg-red-100 text-red-800';
        default:
            return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
        case 'published':
            return <CheckCircle className="h-5 w-5 text-green-500" />;
        case 'flagged':
            return <XCircle className="h-5 w-5 text-red-500" />;
        default:
            return null;
        }
    };

    const renderStars = (rating: number) => {
        return (
        <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
            index < rating ? (
                <Star key={index} className="h-5 w-5 text-yellow-400 fill-current" />
            ) : (
                <StarOff key={index} className="h-5 w-5 text-gray-300" />
            )
            ))}
        </div>
        );
    };

    const filteredReviews = reviews.filter(review => {
        if (selectedFilter === 'all') return true;
        return review.status === selectedFilter;
    });
  return (
    <div className="flex-1 overflow-y-auto p-4 lg:p-6">
    {/* Filters */}
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">Customer Reviews</h1>
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

    {/* Reviews List */}
    <div className="grid grid-cols-1 gap-4">
      {filteredReviews.map(review => (
        <div key={review.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img
                  src={review.customerImage}
                  alt={review.customerName}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">{review.customerName}</h3>
                  <p className="text-sm text-gray-500">{review.service}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 ${getStatusClass(review.status)}`}>
                  {getStatusIcon(review.status)}
                  {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
                </span>
                <div className="relative">
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <MoreVertical className="h-5 w-5 text-gray-500" />
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-4">
              {renderStars(review.rating)}
              <p className="mt-3 text-gray-600">{review.comment}</p>
            </div>
            <div className="mt-4 flex items-center text-sm text-gray-500 space-x-4">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {review.date}
              </div>
              <div className="flex items-center">
                <ThumbsUp className="h-4 w-4 mr-1" />
                {review.likes} likes
              </div>
              <div className="flex items-center">
                <MessageSquare className="h-4 w-4 mr-1" />
                {review.replies} replies
              </div>
              {review.reported && (
                <div className="flex items-center text-red-500">
                  <Flag className="h-4 w-4 mr-1" />
                  Reported
                </div>
              )}
            </div>
          </div>
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end space-x-3">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200">
              View Details
            </button>
            {review.status === 'pending' && (
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200">
                Approve Review
              </button>
            )}
            {review.status === 'flagged' && (
              <button className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-200">
                Remove Review
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
  )
}

export default Reviews



const reviews = [
    {
      id: 'REV-2024-001',
      customerName: 'James Wilson',
      customerImage: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
      rating: 5,
      service: 'Engine Repair',
      mechanic: 'John Smith',
      date: '2024-03-15',
      comment: "Exceptional service! John was professional and thorough. My car's running better than ever. Would highly recommend to anyone needing engine work.",
      status: 'published',
      likes: 12,
      replies: 2,
      reported: false
    },
    {
      id: 'REV-2024-002',
      customerName: 'Emily Brown',
      customerImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
      rating: 4,
      service: 'Oil Change',
      mechanic: 'Maria Rodriguez',
      date: '2024-03-14',
      comment: "Quick and efficient service. Maria explained everything clearly. Only giving 4 stars because the waiting area could use some updating.",
      status: 'pending',
      likes: 5,
      replies: 1,
      reported: false
    },
    {
      id: 'REV-2024-003',
      customerName: 'Michael Chen',
      customerImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
      rating: 2,
      service: 'Brake Replacement',
      mechanic: 'David Chen',
      date: '2024-03-13',
      comment: "Service took longer than quoted and the final price was higher than the estimate. Not very satisfied with the experience.",
      status: 'flagged',
      likes: 1,
      replies: 3,
      reported: true
    },
    {
      id: 'REV-2024-004',
      customerName: 'Sarah Johnson',
      customerImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
      rating: 5,
      service: 'AC Repair',
      mechanic: 'Sarah Johnson',
      date: '2024-03-12',
      comment: "Sarah was amazing! Fixed my AC in no time and the price was very reasonable. The whole experience was great from start to finish.",
      status: 'published',
      likes: 8,
      replies: 1,
      reported: false
    },
    {
      id: 'REV-2024-005',
      customerName: 'Robert Taylor',
      customerImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
      rating: 3,
      service: 'Tire Rotation',
      mechanic: 'Mike Brown',
      date: '2024-03-11',
      comment: "Average service. Got the job done but communication could have been better. Had to ask multiple times about the status of my vehicle.",
      status: 'pending',
      likes: 2,
      replies: 0,
      reported: false
    }
  ];

  const filters = [
    { id: 'all', label: 'All Reviews' },
    { id: 'published', label: 'Published' },
    { id: 'pending', label: 'Pending' },
    { id: 'flagged', label: 'Flagged' }
  ];