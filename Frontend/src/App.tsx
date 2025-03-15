import { useEffect } from 'react'
import './App.css'
import { Outlet, useLocation } from 'react-router-dom'
import { Header, Footer } from './components'


function App() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

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
