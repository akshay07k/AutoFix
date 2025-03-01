import { motion, useScroll, useTransform } from "framer-motion";

const MovingCar = () => {
  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0, 1], ["-100vw", "50vw"]);

  return (
    <section className="relative h-52 flex items-center justify-center bg-black overflow-hidden">
      <motion.img
        src="https://images.pexels.com/photos/5550303/pexels-photo-5550303.jpeg?auto=compress&cs=tinysrgb&w=1200"
        alt="Car"
        style={{ x }}
        className="w-[400px] md:w-[600px] lg:w-[700px] h-full object-cover object-[center_78%]"
      />
    </section>
  );
};

export default MovingCar;
