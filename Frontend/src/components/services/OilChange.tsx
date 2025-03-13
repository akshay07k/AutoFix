import React from 'react'

const OilChange: React.FC = () => {
  return (
    <div className='mx-auto max-w-7xl'>
        <div className='relative h-[350px] rounded-2xl overflow-hidden mb-12'>
            <img
            src='https://images.pexels.com/photos/13065691/pexels-photo-13065691.jpeg?auto=format&fit=crop&w=1920&q=80'
            alt='Auto mechanic working'
            className='w-full h-full object-cover'
            />
            <div className='absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 flex items-center justify-center'>
            <div className='p-8 md:p-12 max-w-2xl'>
                <h1 className='text-2xl lg:text-4xl md:text-5xl font-bold text-white mb-4 text-center'>
                Oil Change
                </h1>
                <p className='text-md lg:text-lg text-gray-200 mb-8 text-center'>
                Changing your oil per your vehicle maintenance schedule is ALWAYS a good idea!
                </p>
                <div className='flex items-center justify-center'>
                <button className='bg-blue-600/80 text-white px-8 py-3 rounded-lg text-md lg:text-lg font-semibold hover:bg-blue-700 transition-colors'>
                Book Now!
                </button>
                </div>
            </div>
            </div>

        </div>
    </div>
  )
}

export default OilChange