import React from "react";
import { motion } from "framer-motion";

export default function DesignerDetailsSection1({ designerDetails }) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-20 px-4 sm:px-6 lg:px-8">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-amber-400/10 to-rose-400/10 transform -skew-y-2 origin-top-left"></div>

      <div className="max-w-6xl mx-auto relative mt-[-50px]">
        {/* Logo with animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex justify-center mb-8"
        >
          <div className="w-48 h-48 md:w-56 md:h-56 rounded-xl bg-white p-6 shadow-lg border border-gray-100 flex items-center justify-center">
            <img
              src={designerDetails.logo.url}
              alt={`${designerDetails.name} logo`}
              className="max-h-full max-w-full object-contain"
            />
          </div>
        </motion.div>

        {/* Designer name with animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center mb-6"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 tracking-tight -mt-3">
            <span className="block">{designerDetails.name.toUpperCase()}</span>
            <span className="block text-2xl md:text-3xl font-light text-amber-600 mt-2">
              PERFUMES
            </span>
          </h1>

          {/* Decorative divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-4 mx-auto w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"
          />
        </motion.div>

        {/* Description with animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="max-w-6xl mx-auto "
        >
          <p
            className="border border-gray-300 p-4 text-lg md:text-xl text-black leading-relaxed text-justify"
            dangerouslySetInnerHTML={{ __html: designerDetails.description }}
          ></p>
        </motion.div>
      </div>

      {/* Bottom decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-r from-amber-400/5 to-rose-400/5 transform skew-y-1 origin-bottom-left"></div>
    </div>
  );
}
