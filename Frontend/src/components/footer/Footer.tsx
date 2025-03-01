import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, X} from 'lucide-react'

const Footer: React.FC = () => {
  return (
    <section className="relative overflow-hidden flex flex-col items-center justify-center bg-gray-900 text-white w-full ">
      <div className="container w-full">
        <div className="relative flex flex-col items-center text-center space-y-6">
          <div className="absolute inset-0 backdrop-blur-xl rounded-2xl" />
          <div className="relative py-12 w-full">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extralight tracking-tight mb-6 text-white [text-shadow:_0_4px_12px_rgb(0_0_0_/_20%)]">
              How can we <span className="text-blue-400 font-semibold">help?</span>
            </h2>
            <p className="text-gray-300 text-sm sm:text-lg max-w-[600px] mx-auto mb-8 text-center">
              Our service team is available 7 days a week, Monday - Friday from 6 AM to 5 PM PST, 
              Saturday - Sunday 7 AM - 4 PM PST.
            </p>

            <div className="flex justify-center w-full max-w-md mx-auto gap-2 text-blue-400">
              <Link to="">(+91) 8219436462</Link> |
              <Link to="">akshay41k@gmail.com</Link>
            </div>
            <hr className="my-6 border-gray-600 w-full" />
            <div className='flex justify-between'>
              <div className="flex flex-wrap justify-center gap-4 text-gray-400 text-sm ">
                <Link to="/services">Services</Link>
                <Link to="/about-us">About Us</Link>
                <Link to="/review">Reviews</Link>
                <Link to="https://instagram.com" 
                target='_blank'>
                  <Instagram size={20}/>
                </Link>
                <Link to="https://facebook.com"
                target='_blank'>
                  <Facebook size={20}/>
                </Link>
                <Link to="https://x.com"
                target='_blank'>
                  <X size={20}/>
                </Link>
              </div>
              <p className="text-gray-500 text-sm mt-4">
                Copyright ©2025 AutoFix | All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
