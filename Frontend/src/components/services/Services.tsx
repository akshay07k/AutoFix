import React from 'react'
import { Outlet } from 'react-router-dom'

const Services: React.FC = () => {
  return (
    <>
        <div className='bg-white/95 px-4 lg:px-14 py-8'>
            <Outlet />
        </div>
    </>
  )
}

export default Services