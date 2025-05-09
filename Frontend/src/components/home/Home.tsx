import React from 'react'
import { ArrowRight, Settings } from "lucide-react"
import { Button } from '../ui'
import { MovingCar, CustomerReview } from '..'
import { Link } from 'react-router-dom'
import h2 from '../../assets/h2.png'
const Home: React.FC = () => {
  
  return (
    <>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center">
          {/* Background Image */}
          <div className="absolute inset-0">
          <img
            // src="https://images.pexels.com/photos/30562891/pexels-photo-30562891/free-photo-of-outdoor-vehicle-storage-system-with-toolbox.jpeg?auto=compress&cs=tinysrgb&w=1200"
            src={h2}
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover opacity-60"
            />

            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40" />
          </div>

          {/* Content */}
          <div className="relative container flex flex-col items-center justify-center min-h-screen text-center px-4" id='about-us'>
            <h1 className="text-3xl sm:text-6xl md:text-6xl font-bold tracking-tighter text-white mb-6 [text-shadow:_0_4px_12px_rgb(0_0_0_/_20%)]">
              <span className="block mb-4 [text-shadow:_0_4px_12px_rgb(0_0_0_/_20%)]">
              Hassle-Free Car Maintenance</span>
              <span className="text-blue-400 italic font-light">Anytime, </span>
              <span className="text-gray-300 italic font-light">Anywhere</span>
            </h1>
            <p className="max-w-[600px] text-gray-300 text-md md:text-lg mb-12">
            Get professional auto repair and maintenance at your doorstep—fast, reliable, and affordable.
            </p>
            <Link to={'/services'}>
            <Button
              className="text-white px-6 py-5 text-md rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:scale-105"
            >
              Book a Service
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            </Link>
          </div>
        </section>

        {/* About Us */}
        <section
        id='about-us' className="relative overflow-hidden flex flex-col lg:flex-row items-center justify-center px-12 sm:px-24 bg-white gap-8 py-8">
          <div className="w-full lg:w-1/2 grid grid-cols-2 gap-1 md:p-14">
            <img src="https://media.istockphoto.com/id/1036063284/photo/car-lifting.jpg?b=1&s=612x612&w=0&k=20&c=K5joSf0xaoxQEexdDi30AGmUSGvgmSwU5bRg0CLBdK0=" 
            alt="AutoFix 1" 
            className="w-full aspect-square rounded-ss-4xl shadow-md object-cover ease-in-out duration-300 transform hover:scale-105" 
            />
            <img src="https://media.istockphoto.com/id/472105032/photo/auto-mechanic-working-on-a-car-in-his-garage.jpg?b=1&s=612x612&w=0&k=20&c=6xnzpLSJb03nCb5tj3uudnldzdPgdNDXoABswcy6lL4=" 
            alt="AutoFix 2" 
            className="w-full aspect-square rounded-se-4xl shadow-md object-cover ease-in-out duration-300 transform hover:scale-105" 
            />
            <img src="https://media.istockphoto.com/id/188052258/photo/car-components.jpg?b=1&s=612x612&w=0&k=20&c=3uddKLVhIISTtRL-wgJJUa_p58EsbBV7nEt24IUscGA=" 
            alt="AutoFix 3" 
            className="w-full aspect-square rounded-es-4xl shadow-md object-cover ease-in-out duration-300 transform hover:scale-105" 
            />
            <img src="https://media.istockphoto.com/id/522394158/photo/car-service-procedure.jpg?b=1&s=612x612&w=0&k=20&c=ClGMozdcohH5k-5qWgUA1kYVjCjgiN_JE-orDE_jfa8=" 
            alt="AutoFix 4" 
            className="w-full aspect-square rounded-ee-4xl shadow-md object-cover ease-in-out duration-300 transform hover:scale-105" 
            />
          </div>

          <div className="w-full lg:w-1/2 text-center lg:text-left p-6">
            <h2 className="text-4xl font-extralight mb-4 text-gray-900">Welcome to&nbsp;
              <span className="text-blue-500 font-semibold">AutoFix</span>
            </h2>

            <div className="flex items-center justify-center w-full">
              <div className="flex-1 h-[1.5px] bg-gray-500"></div>
                <div className="px-4">
                  <Settings className="w-6 h-6 text-gray-700" />
                </div>
                <div className="flex-1 h-[1.5px] bg-gray-500"></div>
            </div>

            <p className="text-lg font-medium text-gray-700 mb-6">
              AutoFix connects professional mechanics with vehicle owners who need quick, hassle-free maintenance—wherever and whenever they need it.
            </p>
            <p className="text-lg font-light text-gray-700 mb-6">
              When a mechanic is requested, AutoFix dispatches them directly to the vehicle’s location for non-intrusive repairs. Clients pay upfront, and mechanics receive their payment once the job is successfully completed.  
            </p>
            <p className="hidden md:block text-lg font-light text-gray-700 mb-6">
              Whether it’s a battery replacement, oil change, or a simple diagnostic check, our certified mechanics bring top-quality service straight to your doorstep. We eliminate the need for long waits at repair shops by providing on-demand solutions tailored to your schedule.  
              The best part? AutoFix ensures fast, reliable service by matching vehicle owners with skilled professionals—through our website or even via text!
            </p>

          </div>
        </section>


        {/* Services */}
        <section className="relative overflow-hidden py-8 sm:py-14 lg:24 flex flex-col items-center justify-center bg-black">
          <div className="container relative">
            <h2 className="text-4xl md:text-5xl font-extralight tracking-tight mb-12 text-center text-white [text-shadow:_0_4px_12px_rgb(0_0_0_/_20%)]">
              Our <span className="text-blue-400 font-semibold">Services</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 lg:gap-8">
              {service.map((item, index) => (
                <div
                  key={index}
                  className="group bg-gray-800 backdrop-blur-sm rounded-xl mx-8 sm:mx-0 p-4  transition-transform duration-300 hover:scale-105 border border-white/10"
                >
                  <div className="aspect-square overflow-hidden rounded-lg bg-black/50 mb-4">
                    <img
                      src={item.image || "https://7yni3ugp343arypgh.lite.vusercontent.net/placeholder.svg?height=400&width=300"}
                      alt={item.name}
                      width={500}
                      height={500}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="hidden group-hover:block absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                      <h3 className='text-2xl text-white text-center tracking-wider font-bold mb-2'>{item.name}</h3>
                      <Link to={`services/${item.name.toLowerCase().replace(' ', '-')}`}>
                      <p className='text-center py-1 rounded-lg bg-white text-gray-700 font-bold text-lg cursor-pointer'>More Info</p>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Moving Car Animation */}
        <MovingCar /> 

        {/* Customer reviews */}
        <CustomerReview />
      </main>
    </>
  )
}

export default Home

const service = [
  {
    name: "Brakes Replacement",
    image: "https://images.pexels.com/photos/3642618/pexels-photo-3642618.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    name: "Oil Change",
    image: "https://images.pexels.com/photos/13065691/pexels-photo-13065691.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    name: "Battery Replacement",
    image: "https://images.pexels.com/photos/4374843/pexels-photo-4374843.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    name: "Car Wash",
    image: "https://media.istockphoto.com/id/1310978724/photo/the-washing-process-on-a-self-service-car-wash.jpg?b=1&s=612x612&w=0&k=20&c=4tzXceGd1Tb1l9yTbGpnA4G0gKY3gc7XV_l1b_gCzK8=",
  }

]

