import React from 'react'
import { Clock, Shield, Trophy, Wrench } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui';

const AllServices: React.FC = () => {
    const navigate = useNavigate();
    const features = [
        {
          icon: Clock,
          title: 'Quick Service',
          description: 'Most services completed within hours',
        },
        {
          icon: Shield,
          title: 'Quality Guarantee',
          description: 'Certified technicians and genuine parts',
        },
        {
          icon: Trophy,
          title: 'Expert Team',
          description: 'Experienced professionals at your service',
        },
        {
          icon: Wrench,
          title: 'Full Service',
          description: 'Comprehensive vehicle maintenance',
        },
    ];
    
    return (
        <div className="mx-auto max-w-7xl">
            {/* Hero Section */}
            <div className="relative h-[500px] rounded-2xl overflow-hidden mb-12">
                <img
                src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1920&q=80"
                alt="Auto mechanic working"
                className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 flex items-center">
                <div className="p-8 md:p-12 max-w-2xl">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    Professional Vehicle Maintenance Services
                    </h1>
                    <p className="text-lg text-gray-200 mb-8">
                    Keep your vehicle running smoothly with our expert maintenance services.
                    Book your appointment today!
                    </p>
                    <Button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700"
                    onClick={() => navigate('consultation')}>
                    Schedule Service
                    </Button>
                </div>
                </div>
            </div>
        
            {/* Features Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                {features.map((feature, index) => (
                <div
                    key={index}
                    className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                    <feature.icon className="h-12 w-12 text-blue-600 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                </div>
                ))}
            </div>
        
            {/* Services Preview */}
            <div className="grid md:grid-cols-2 gap-8">
                {services.map((service, index) => (
                    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow" key={index}>
                    <img
                        src={service.image}
                        className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.name}</h3>
                        <p className="text-gray-600 mb-4">
                        {service.description}
                        </p>
                        <Link
                        to={service.name.toLowerCase().replace(' ', '-')}
                        className="text-blue-600 font-semibold hover:text-blue-700"
                        >
                        Learn More →
                        </Link>
                    </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AllServices


const services = [

    {
        name: "Oil Change",
        image: "https://images.pexels.com/photos/13065691/pexels-photo-13065691.jpeg?auto=compress&cs=tinysrgb&w=1200",
        description: "Regular oil changes are crucial for your engine's health. Our certified technicians use high-quality oil and filters"
    },
    {
        name: "Brakes Replacement",
        image: "https://images.pexels.com/photos/3642618/pexels-photo-3642618.jpeg?auto=compress&cs=tinysrgb&w=1200",
        description: "Ensure your safety with our comprehensive brake inspection and replacement services. We use quality parts for optimal performance"
    },
    // {
    //     name: "Tires",
    //     image: "https://media.istockphoto.com/id/1312834665/photo/tire-changing-in-a-car-service.jpg?b=1&s=612x612&w=0&k=20&c=zxQK4BYG9eD7kUXQBW95OudMdvyCDORzYQOsMwkJpRM=",
    //     description: "We offer a wide selection of tires for all makes and models. Our experts will help you find the right tires for your vehicle"
    // },
    {
        name: "Car Wash",
        image: "https://media.istockphoto.com/id/1310978724/photo/the-washing-process-on-a-self-service-car-wash.jpg?b=1&s=612x612&w=0&k=20&c=4tzXceGd1Tb1l9yTbGpnA4G0gKY3gc7XV_l1b_gCzK8=",
        description: "Keep your vehicle looking its best with our professional car wash services. We offer interior and exterior cleaning"
    },
    {
        name: "Battery Replacement",
        image: "https://images.pexels.com/photos/4374843/pexels-photo-4374843.jpeg?auto=compress&cs=tinysrgb&w=1200",
        description: "If your battery is old or failing, we can replace it with a new one. Our technicians will ensure proper installation"
    }
  
];