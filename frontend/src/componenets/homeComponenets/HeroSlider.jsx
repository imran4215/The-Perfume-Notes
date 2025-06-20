import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    setIsFirstRender(false);
  }, []);

  const slides = [
    {
      title: "Designer Collections",
      description:
        "Explore luxury fragrances from the world's most prestigious fashion houses",
      content: "Chanel · Dior · Tom Ford · Gucci · YSL · Versace",
      bgImage: "/designers.webp",
      cta: "View Designer Perfumes",
      ctaLink: "/designers",
      width: 1600,
      height: 900,
      placeholder: "/designers-placeholder.jpg", // Low-quality placeholder
    },
    {
      title: "Master Perfumers",
      description: "Discover the noses behind your favorite scents",
      content:
        "Jacques Polge · Olivier Cresp · Alberto Morillas · Dominique Ropion",
      bgImage: "/perfumer.webp",
      cta: "Meet The Artists",
      ctaLink: "/perfumers",
      width: 1600,
      height: 900,
      placeholder: "/perfumer-placeholder.jpg",
    },
    {
      title: "Fragrance Notes",
      description: "Understand the composition of fine perfumery",
      content:
        "Top: Bergamot, Lemon | Heart: Jasmine, Rose | Base: Sandalwood, Vanilla",
      bgImage: "/notes.webp",
      cta: "Learn About Notes",
      ctaLink: "/notes",
      width: 1600,
      height: 900,
      placeholder: "/notes-placeholder.jpg",
    },
  ];

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  return (
    <>
      <Helmet>
        {/* Preload critical resources */}
        <link
          rel="preload"
          href={slides[0].bgImage}
          as="image"
          fetchpriority="high"
        />
        <link rel="preload" href={slides[0].placeholder} as="image" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />

        {/* Preload other slide images after first render */}
        {!isFirstRender &&
          slides
            .slice(1)
            .map(({ bgImage }, i) => (
              <link key={i} rel="preload" href={bgImage} as="image" />
            ))}
      </Helmet>

      <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
        {currentSlide === 0 ? (
          // First slide - optimized for LCP
          <div className="absolute inset-0">
            {/* Blur-up technique with placeholder */}
            <div className="absolute inset-0">
              <img
                src={slides[0].placeholder}
                alt=""
                width={slides[0].width}
                height={slides[0].height}
                className="w-full h-full object-cover"
                loading="eager"
                decoding="async"
                style={{ filter: "blur(10px)" }}
              />
            </div>
            <img
              src={slides[0].bgImage}
              alt="Background"
              width={slides[0].width}
              height={slides[0].height}
              loading="eager"
              decoding="async"
              fetchpriority="high"
              className="w-full h-full object-cover"
              onLoad={(e) => {
                e.target.style.opacity = 1;
              }}
              style={{
                opacity: 0,
                transition: "opacity 300ms ease-in-out",
                position: "relative",
              }}
            />
            <div className="absolute inset-0 bg-black opacity-70" />
          </div>
        ) : (
          // Other slides with animation
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
                width={slides[currentSlide].width}
                height={slides[currentSlide].height}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black opacity-70" />
            </motion.div>
          </AnimatePresence>
        )}

        {/* Content - optimized for CLS */}
        <div className="relative z-10 h-full flex flex-col justify-center px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="text-white max-w-3xl mx-auto text-center"
              style={{ willChange: "transform, opacity" }} // Hint for browser optimization
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
                prefetch="intent" // Prefetch on hover
              >
                {slides[currentSlide].cta}
              </Link>
            </motion.div>
          </AnimatePresence>

          {/* Navigation dots */}
          <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-12">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-3 h-3 rounded-full transition ${
                  currentSlide === idx ? "bg-white" : "bg-white/50"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-white/80 hover:text-white cursor-pointer"
            aria-label="Previous slide"
          >
            <ChevronLeft size={32} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white/80 hover:text-white cursor-pointer"
            aria-label="Next slide"
          >
            <ChevronRight size={32} />
          </button>
        </div>
      </div>
    </>
  );
}
