import React, { useEffect, useState } from 'react';
import { Star, Phone, Mail, MapPin, Award, Wrench } from 'lucide-react';
import { getMechanicById, updateMechanicStatus } from '../apis/Mechanic';
import { Link, useParams } from 'react-router-dom';


const MechanicProfile: React.FC = () => {
  const [mechanicStatus, setMechanicStatus] = React.useState<string>('');
  const [mechanicData, setMechanicData] = useState<any>({});
  const { mechanicId } = useParams();
  if(mechanicId === undefined) {
    return;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMechanicById(mechanicId);
        setMechanicData(response.data);
        setMechanicStatus(response.data.status);
      } catch (error) {
        console.error("Error fetching mechanic data:", error);
      }
    }
    fetchData();
  }, []);

  const updateStatus = async () => {
    try {
      const response = await updateMechanicStatus(mechanicData._id, mechanicStatus);
      if(!response) {
        console.log("Error updating status");
        return;
      }
      window.location.reload();
    } catch (error) {
      console.log("Error updating status:", error);
    }
  }
  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="max-w-7xl mx-auto px-4 h-full flex justify-between items-end flex-wrap">
          <div className='flex gap-12'>
            <img 
              src={mechanicData.avatar} 
              alt={mechanicData.name}
              className="w-32 h-32 rounded-full border-4 border-white mb-4"
            />
            <div className="flex flex-col md:items-center justify-between py-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{mechanicData.name}</h1>
                <div className="flex items-center mt-2">
                  <div className={`h-3 w-3 rounded-full ${mechanicData.status == "available" ? "bg-green-500" : mechanicData.status == "busy" ? "bg-yellow-700" : "bg-red-700"}`} />
                  <span className="ml-2 text-sm font-medium">
                    {mechanicData.status == "available" ? "Available" : mechanicData.status == "busy" ? "Busy" : "Left"}
                  </span>
                </div>
              </div>

              <div className="mt-4 md:mt-0 flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={24}
                    className="text-gray-300"
                  />
                ))}
                <span className="ml-2 text-gray-600">New</span>
              </div>
            </div>
          </div>
          <div>
            <select
              className="block w-full pl-10 pr-8 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 appearance-none"
              value={mechanicStatus}
              onChange={(e) => setMechanicStatus(e.target.value)}
            >
              <option value="available">Available</option>
              <option value="busy">Busy</option>
              <option value="left">Left</option>
            </select>
            <button
            className='mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors'
            onClick={() => updateStatus()}
            >
              Update Status
            </button>
          </div>
          

        </div>

        <p className="mt-6 text-xl text-gray-600 max-w-3xl">{mechanicData.desc}</p>

        <div className="mt-12 grid md:grid-cols-2 gap-6 bg-gray-100 p-4 rounded-2xl ">
          <div className="space-y-8 ">
            <h2 className="text-2xl font-semibold text-gray-900">Expertise</h2>
            <div className="grid grid-cols-2 ">
              <div className="flex items-start">
                <Award size={24} className="text-blue-600 mt-1" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Experience</h3>
                  <p className="text-gray-600">{mechanicData.experience}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Wrench size={24} className="text-blue-600 mt-1" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Specialty</h3>
                  <p className="text-gray-600">{mechanicData.specialty}</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">Contact Information</h2>
            <div className="space-y-4">
              <a
                href={``}
                className="flex items-center gap-2 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Phone size={24} />
                <span className="text-lg">{mechanicData.phone}</span>
              </a>
              <a
                href={``}
                className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Mail size={24} className="text-gray-600" />
                <span className="text-lg text-gray-900">{mechanicData.email}</span>
              </a>
              <a
                href={``}
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <MapPin size={24} className="text-gray-600" />
                <span className="text-lg text-gray-900">{mechanicData.address}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className='flex justify-start items-center gap-4 mx-8 my-4'>
        <Link to={`/admin/add-mechanic/${mechanicData._id}`}
                  className='text-white font-semibold bg-green-700 px-4 py-2 rounded-md hover:bg-green-800 transition-colors'
        >Update Mechanic</Link>
      </div>
    </div>
  );
}

export default MechanicProfile;