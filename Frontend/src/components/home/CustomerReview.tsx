import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage, Button, Card, CardContent } from "../ui"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"

const reviews = [
  { id: 1, name: "John Doe", rating: 5, text: "AutoFix is amazing! They fixed my car quickly.", position: "Marketing Director" },
  { id: 2, name: "Sarah Smith", rating: 4.5, text: "Great service and affordable pricing!", position: "Software Engineer" },
  { id: 3, name: "Mike Johnson", rating: 4.8, text: "Very convenient! Will use again.", position: "Creative Designer" },
  { id: 4, name: "Emily White", rating: 4.2, text: "Super friendly staff and quick service!", position: "Business Analyst" },
  { id: 5, name: "David Brown", rating: 4.7, text: "Best auto service I've used so far.", position: "Customer" },
]

const CircularReviewScroller = () => {
  const [index, setIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  const nextSlide = useCallback(() => {
    setIndex((prevIndex) => (prevIndex + 1) % reviews.length)
  }, [])

  const prevSlide = () => {
    setIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length)
  }

  useEffect(() => {
    let interval:any;
    if (autoplay) {
      interval = setInterval(nextSlide, 3000)
    }
    return () => clearInterval(interval)
  }, [autoplay, nextSlide])

  const renderStars = (rating:any) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
      ))
  }

  return (
    <section className="relative overflow-hidden py-24 flex flex-col items-center justify-center gap-8 bg-white w-full">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-extralight text-gray-800 uppercase">
          Look what our <span className="text-blue-500 font-semibold">customers</span> are saying
        </h1>
      </div>

      <div className="flex items-center justify-center w-full max-w-7xl h-60 gap-8">
        {/* Left Section - Review Summary */}
        <div className=" rounded-lg flex items-center justify-center gap-4 p-8 bg-white shadow-md ">
          <div className="flex flex-col justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">AutoFix</h2>
              <p
              className="text-sm text-gray-500"
              >Instant Vehicle Service Booking</p>
              <p className="text-sm text-gray-600">⭐ 4.3 Rating</p>
            </div>
            {/* <Button className="mt-2 bg-blue-500 text-white p-2 rounded-lg font-medium">Write a review</Button> */}
          </div>
        </div>

        {/* Review Slider */}
        <div className="relative w-3/4 h-full ">
          
        <div className="relative overflow-hidden">
          <motion.div
            className="flex transition-transform duration-500 ease-in-out min-h-60"
            style={{ transform: `translateX(-${index * 100}%)` }}
            onHoverEnd={() => setAutoplay(true)}
            onHoverStart={() => setAutoplay(false)}
          >
            {reviews.map((review) => (
              <div key={review.id} className="w-full flex-shrink-0 px-10 py-4 min-h-52  rounded-xl shadow-sm">
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex flex-col h-full">
                      <div className="flex items-center mb-4">
                        <Avatar className="h-10 w-10 mr-4">
                          <AvatarImage src="/placeholder.svg?height=40&width=40" alt={review.name} />
                          <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{review.name}</h3>
                          <p className="text-sm text-muted-foreground">{review.position}</p>
                        </div>
                      </div>
                      <div className="flex mb-4">{renderStars(review.rating)}</div>
                      <p className="text-muted-foreground flex-grow">{review.text}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Navigation buttons */}
        <Button
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full bg-white shadow-md hover:bg-gray-50"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-4 w-4 text-black" />
        </Button>
        <Button
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rounded-full bg-white shadow-md hover:bg-gray-50"
          onClick={nextSlide}
        >
          <ChevronRight className="h-4 w-4 text-black" />
        </Button>

        {/* Pagination indicators */}
        <div className="flex justify-start mt-4">
          {reviews.map((_, i) => (
            <button
              key={i}
              className={`h-2 w-2 rounded-full mx-1 ${i === index ? "bg-primary" : "bg-muted"}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
        </div>
      </div>
    </section>
  );
};

export default CircularReviewScroller;
