import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Save } from 'lucide-react';
import { createMechanic, getMechanicById, updateMechanic } from '../apis/Mechanic';

export interface Mechanic {
  _id: string;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  address: string;
  rating: number;
  reviews: number;
  status: 'available' | 'busy' | 'offline';
  experience: string;
  specialty: string;
  desc: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const MechanicForm: React.FC = () => {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const [mechanicData, setMechanicData] = useState<Mechanic | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    experience: '',
    specialty: '',
    desc: '',
    avatar: ''
  });

  useEffect(() => {
    if (isEditing) {
      const fetchData = async () => {
        try {
          const response = await getMechanicById(id!);
          setMechanicData(response.data);
          
        }
        catch (error) {
          console.error('Error fetching mechanic data:', error);
        }
      };

      if(mechanicData == null) fetchData();
    }
  }, []);


  useEffect(() => {
    if (mechanicData) {
      setFormData({
        name: mechanicData.name,
        email: mechanicData.email,
        phone: mechanicData.phone,
        address: mechanicData.address,
        experience: mechanicData.experience,
        specialty: mechanicData.specialty,
        desc: mechanicData.desc,
        avatar: mechanicData.avatar
      });
    }
  }, [mechanicData]);
  // console.log(mechanicData);
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log('Form submitted:', formData);

    let res;
    if(!isEditing) {
      res = await createMechanic(formData);
    }
    else {
      if(!id) return;
      res = await updateMechanic(id, formData);
    }
    if (res) {
      console.log('Mechanic created successfully:', res);
      window.location.reload();
    } else {
      console.error('Error creating mechanic');
    }
    
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="px-4 py-8 w-full ">

      <h1
        className='text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2'
      >{isEditing ? "Edit" : "Add"} Mechanic</h1> 

      <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-xl shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Avatar URL
            </label>
            <input
              type="url"
              name="avatar"
              value={formData.avatar}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Experience
            </label>
            <input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Specialty
            </label>
            <input
              type="text"
              name="specialty"
              value={formData.specialty}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Workshop Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="desc"
              value={formData.desc}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Save size={20} />
            <span>{isEditing ? 'Update Profile' : 'Create Profile'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default MechanicForm;