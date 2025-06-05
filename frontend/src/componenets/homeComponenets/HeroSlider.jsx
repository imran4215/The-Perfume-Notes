import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Designer Collections",
      description:
        "Explore luxury fragrances from the world's most prestigious fashion houses",
      content: "Chanel · Dior · Tom Ford · Gucci · YSL · Versace",
      bgImage: "designers.jpg",
      cta: "View Designer Perfumes",
      ctaLink: "/designers",
    },
    {
      title: "Master Perfumers",
      description: "Discover the noses behind your favorite scents",
      content:
        "Jacques Polge · Olivier Cresp · Alberto Morillas · Dominique Ropion",
      bgImage: "perfumer.jpg",
      cta: "Meet The Artists",
      ctaLink: "/perfumers",
    },
    {
      title: "Fragrance Notes",
      description: "Understand the composition of fine perfumery",
      content:
        "Top: Bergamot, Lemon | Heart: Jasmine, Rose | Base: Sandalwood, Vanilla",
      bgImage: "notes.jpg",
      cta: "Learn About Notes",
      ctaLink: "/notes",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
      {/* Background with overlay */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <img
            src={slides[currentSlide].bgImage}
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-70"></div>
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="text-white max-w-3xl mx-auto text-center"
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              {slides[currentSlide].title}
            </h1>
            <p className="text-lg md:text-2xl mb-6">
              {slides[currentSlide].description}
            </p>
            <p className="text-md md:text-xl mb-8 font-light">
              {slides[currentSlide].content}
            </p>
            <Link
              to={slides[currentSlide].ctaLink}
              className="inline-block px-8 py-3 bg-pink-600 hover:bg-pink-700 rounded-full text-white font-semibold transition"
            >
              {slides[currentSlide].cta}
            </Link>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Dots */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-12">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition ${
                currentSlide === index ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>

        {/* Arrows using Lucide Icons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-white/80 hover:text-white cursor-pointer"
        >
          <ChevronLeft size={32} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white/80 hover:text-white cursor-pointer"
        >
          <ChevronRight size={32} />
        </button>
      </div>
    </div>
  );
}
