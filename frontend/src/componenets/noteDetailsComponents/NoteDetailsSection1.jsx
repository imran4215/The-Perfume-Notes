import React from "react";
import { motion } from "framer-motion";

const NoteDetailsSection1 = ({ noteDetails }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative w-full h-full bg-gradient-to-b from-gray-100 to-white"
    >
      {/* Cover Image */}
      <div className="relative w-full h-72 md:h-96 lg:h-[400px] overflow-hidden">
        <img
          src={noteDetails?.coverPic?.url || noteDetails?.profilePic?.url || ""}
          alt={noteDetails?.name || ""}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent"></div>
      </div>

      {/* Profile Image and Details */}
      <div className="relative z-10 -mt-20 md:-mt-60 px-4 md:px-10 lg:px-20">
        <div className="flex flex-col md:flex-row items-start gap-6 bg-white/60 backdrop-blur-md rounded-xl p-6 shadow-xl">
          {/* Profile Image */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-32 h-32 md:w-40 md:h-40 rounded-xl overflow-hidden border-4 border-white shadow-md"
          >
            <img
              src={noteDetails?.profilePic?.url || ""}
              alt={noteDetails?.name || ""}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Text Details */}
          <div className="flex-1 text-gray-800 text-justify">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-4xl font-bold mb-1"
            >
              {noteDetails?.name || " "}
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg font-medium text-yellow-600 mb-3"
            >
              {noteDetails?.category?.name || " "}
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
              className="text-base md:text-lg text-gray-700 max-w-3xl leading-relaxed"
              dangerouslySetInnerHTML={{ __html: noteDetails?.details || "" }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NoteDetailsSection1;
