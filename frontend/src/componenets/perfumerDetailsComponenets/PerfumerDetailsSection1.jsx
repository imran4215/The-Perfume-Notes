import React from "react";
import { motion } from "framer-motion";

function PerfumerDetailsSection1({ perfumerDetails }) {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Top Section - Image + Basic Info */}
      <div className="flex flex-col md:flex-row gap-10 mb-16 items-center md:items-start">
        {/* Image - Left - Made more prominent */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="md:w-2/5 lg:w-1/3"
        >
          <div className="relative group">
            <img
              src={perfumerDetails.image.url}
              alt={perfumerDetails.name}
              className="w-full h-auto rounded-xl shadow-xl object-cover aspect-square border-4 border-white transform group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 rounded-xl border-4 border-transparent group-hover:border-amber-100/50 transition-all duration-300 pointer-events-none"></div>
          </div>
        </motion.div>

        {/* Name + Intro - Right - Enhanced layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="md:w-3/5 lg:w-2/3 bg-white p-8 rounded-xl shadow-lg border border-gray-100"
        >
          <div className="mb-6 pb-6 border-b border-gray-100">
            <h1 className="text-4xl font-bold text-gray-900">
              {perfumerDetails.name}
            </h1>
            <p className="text-xl text-amber-600 mt-2 font-medium">
              {perfumerDetails.title}
            </p>
          </div>

          <p className="text-lg text-gray-700 leading-relaxed">
            {perfumerDetails.intro}
          </p>

          {/* Added decorative elements */}
          <div className="mt-8 flex items-center space-x-4">
            <div className="h-px flex-1 bg-gradient-to-r from-amber-400/20 via-amber-400 to-amber-400/20"></div>
            <svg
              className="h-6 w-6 text-amber-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <div className="h-px flex-1 bg-gradient-to-r from-amber-400/20 via-amber-400 to-amber-400/20"></div>
          </div>
        </motion.div>
      </div>

      {/* Details Section - With subtle container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="prose-lg max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-md border border-gray-100"
        dangerouslySetInnerHTML={{ __html: perfumerDetails.bio }}
      />
    </div>
  );
}

export default PerfumerDetailsSection1;
