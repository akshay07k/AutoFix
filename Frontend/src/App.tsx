// import { useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import { Header, Footer } from './components'

function App() {

  return (
    <>
      <div className="flex w-full min-h-screen flex-col bg-[#0A0A0A]">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </>
  )
}

export default App
