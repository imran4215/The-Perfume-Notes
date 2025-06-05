import React from "react";
import { motion } from "framer-motion";
import { FiMail, FiUsers, FiHeart } from "react-icons/fi";
import { Helmet } from "react-helmet-async";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      {/* Meta Tags */}
      <Helmet>
        <title>About Us | The Perfume Notes</title>
        <meta
          name="description"
          content="Discover our passion for fragrance and the art of storytelling at The Perfume Notes. Learn about our mission, values, and how to collaborate with us."
        />
        <meta
          name="keywords"
          content="Perfume, Fragrance, About Us, The Perfume Notes, Perfume Blog, Collaboration"
        />
        <meta name="author" content="The Perfume Notes Team" />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content="About Us | The Perfume Notes" />
        <meta
          property="og:description"
          content="Where passion for fragrance meets the art of storytelling."
        />
        <meta
          property="og:url"
          content="https://theperfumenotes.com/about-us"
        />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Us | The Perfume Notes" />
        <meta
          name="twitter:description"
          content="Join us on a journey through the art and science of perfumery."
        />
        <meta name="twitter:image" content="/logo.png" />
      </Helmet>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-serif tracking-tight">
          About <span className="text-amber-600">The Perfume Notes</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600">
          Where passion for fragrance meets the art of storytelling
        </p>
      </motion.div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold text-gray-800">
            Our <span className="text-amber-600">Mission</span>
          </h2>
          <p className="text-lg text-gray-600">
            At The Perfume Notes, our passion for perfume is the driving force
            behind everything we do. We're dedicated to uncovering the stories
            behind the scents, exploring the craftsmanship of perfumery, and
            sharing our discoveries with fragrance enthusiasts worldwide.
          </p>
          <p className="text-lg text-gray-600">
            Join us as we continue to explore, discover, and celebrate the
            artistry and allure of fragrance, one note at a time.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative h-80 bg-amber-50 rounded-xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('/designers.jpg')] bg-cover bg-center opacity-70"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-amber-50/80"></div>
        </motion.div>
      </div>

      {/* Values Section */}
      <div className="max-w-7xl mx-auto mb-20">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center text-gray-800 mb-12"
        >
          Our <span className="text-amber-600">Values</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Passion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
          >
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-600">
              <FiHeart className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Passion</h3>
            <p className="text-gray-600">
              We live and breathe fragrance. Our love for perfumery fuels our
              dedication to bringing you the most authentic and inspiring
              content.
            </p>
          </motion.div>

          {/* Expertise */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
          >
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Expertise</h3>
            <p className="text-gray-600">
              Our team combines years of industry experience with a nose for
              quality to provide insightful, accurate fragrance analysis.
            </p>
          </motion.div>

          {/* Community */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
          >
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-600">
              <FiUsers className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Community</h3>
            <p className="text-gray-600">
              We believe fragrance is meant to be shared. We foster a welcoming
              space for enthusiasts to connect and learn together.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Collaboration Section */}
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden mb-20">
        <div className="p-8 md:p-12">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-gray-800 mb-6"
          >
            <span className="text-amber-600">Collaborate</span> With Us
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6 text-gray-600"
          >
            <p className="text-lg">
              We are always eager to learn about the exciting developments
              within the fragrance industry. Whether you represent an
              established house or an emerging artisanal brand, we invite you to
              share your news, latest releases, and captivating stories with our
              dedicated editorial team.
            </p>

            <p className="text-lg">
              For efficient communication and seamless feature consideration in
              our encyclopedia or news section, please email us detailed
              information or reach out to our team members directly.
            </p>

            <div className="mt-8">
              <a
                href="mailto:editor@theperfumenotes.com"
                className="inline-flex items-center px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors duration-200 font-medium"
              >
                <FiMail className="mr-2" />
                Contact Our Editorial Team
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Final CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Join Our <span className="text-amber-600">Fragrance Journey</span>
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
          Discover the world of perfumery with us as your guide. From rare
          ingredients to iconic compositions, we're here to illuminate the art
          and science behind every bottle.
        </p>
      </motion.div>
    </div>
  );
};

export default AboutUs;
