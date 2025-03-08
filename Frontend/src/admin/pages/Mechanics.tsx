import React, { useState } from 'react'
import { MapPin, Phone, Star } from 'lucide-react'

const AdminMechanics: React.FC = () => {
    const [selectedFilter, setSelectedFilter] = useState('all');
    
    const filteredMechanics = mechanics.filter(mechanic => {
        switch (selectedFilter) {
            case 'available':
                return mechanic.availability === 'Available';
            case 'highly-rated':
                return mechanic.rating >= 4.8;
            case 'experienced':
                return parseInt(mechanic.experience) >= 15;
            default:
                return true;
        }
    });

    return (
        <div className="flex-1 overflow-y-auto p-4 lg:p-6">
            {/* Header and Filters */}
            <div className="mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">Mechanics</h1>
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

            {/* Mechanics Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Specialty
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Experience
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Rating
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Location
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Phone
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredMechanics.map(mechanic => (
                                <tr key={mechanic.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <img
                                                src={mechanic.image}
                                                alt={mechanic.name}
                                                className="h-8 w-8 rounded-full object-cover mr-2"
                                            />
                                            <span className="text-sm font-medium text-gray-900">{mechanic.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm text-gray-500">{mechanic.specialty}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm text-gray-500">{mechanic.experience}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <Star className="h-4 w-4 text-yellow-400 mr-1" />
                                            <span className="text-sm text-gray-500">
                                                {mechanic.rating} ({mechanic.reviews} reviews)
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                                            <span className="text-sm text-gray-500">{mechanic.location}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <Phone className="h-4 w-4 text-gray-400 mr-1" />
                                            <span className="text-sm text-gray-500">{mechanic.phone}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`
                                            px-2 py-1 rounded-full text-xs font-medium
                                            ${mechanic.availability === 'Available' 
                                                ? 'bg-green-100 text-green-800' 
                                                : mechanic.availability === 'Busy' 
                                                ? 'bg-yellow-100 text-yellow-800' 
                                                : 'bg-red-100 text-red-800'
                                            }
                                        `}>
                                            {mechanic.availability}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AdminMechanics

const mechanics = [
    {
    id: 1,
    name: 'John Smith',
    specialty: 'Engine Specialist',
    experience: '15 years',
    rating: 4.8,
    reviews: 127,
    location: 'Downtown Workshop',
    availability: 'Available',
    phone: '+1 (555) 123-4567',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80'
    },
    {
    id: 2,
    name: 'Maria Rodriguez',
    specialty: 'Transmission Expert',
    experience: '12 years',
    rating: 4.9,
    reviews: 98,
    location: 'West Side Garage',
    availability: 'Busy',
    phone: '+1 (555) 234-5678',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80'
    },
    {
    id: 3,
    name: 'David Chen',
    specialty: 'Electrical Systems',
    experience: '10 years',
    rating: 4.7,
    reviews: 85,
    location: 'East End Auto',
    availability: 'Left',
    phone: '+1 (555) 345-6789',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80'
    },
    {
    id: 4,
    name: 'Sarah Johnson',
    specialty: 'Brake Specialist',
    experience: '8 years',
    rating: 4.6,
    reviews: 64,
    location: 'North Side Service',
    availability: 'Available',
    phone: '+1 (555) 456-7890',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80'
    },
    {
    id: 5,
    name: 'Michael Brown',
    specialty: 'General Maintenance',
    experience: '20 years',
    rating: 4.9,
    reviews: 156,
    location: 'Central Auto Care',
    availability: 'Busy',
    phone: '+1 (555) 567-8901',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80'
    }
];

const filters = [
    { id: 'all', label: 'All Mechanics' },
    { id: 'available', label: 'Available Now' },
    { id: 'highly-rated', label: 'Highly Rated' },
    { id: 'experienced', label: 'Most Experienced' }
];