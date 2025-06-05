import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";

export default function BlogDetailsSection1({ blogDetails }) {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "backOut",
      },
    },
  };

  const barVariants = {
    hidden: { width: 0 },
    visible: (percentage) => ({
      width: `${percentage}%`,
      transition: {
        duration: 1.5,
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    }),
  };

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 sm:py-8">
      {/* Vlog Title  */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 sm:mb-10 px-2 sm:px-0"
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
          {blogDetails.title}
        </h1>
        <h2 className="text-lg sm:text-xl text-gray-600 mt-1 mb-2">
          {blogDetails.subtitle}
        </h2>

        {/* Author byline with subtle styling */}
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <span>By</span>
          <Link
            to={`/authors/${blogDetails.author.slug}`}
            className="ml-1 font-medium text-gray-700"
          >
            {blogDetails.author.name}
          </Link>
        </div>

        {/* Gradient divider with improved design */}
        <div className="w-20 h-1 bg-gradient-to-r from-amber-400 via-rose-400 to-pink-400 rounded-full opacity-90"></div>
      </motion.div>

      {/* Main Content - Mobile optimized */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Side - Perfume Image (full width on mobile) */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full md:w-1/2"
        >
          <div className="relative overflow-hidden rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <img
              src={blogDetails.image1.url}
              alt={blogDetails.title}
              className="w-full h-auto object-cover transform hover:scale-[1.02] transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
          </div>
        </motion.div>

        {/* Right Side - Brand Info and Accords (stacked on mobile) */}
        <div className="w-full md:w-1/2 flex flex-col gap-4 sm:gap-6">
          {/* Brand Section - Compact on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-4 sm:p-5 rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
          >
            <div className="flex items-center gap-3 sm:gap-4 mb-3">
              <motion.div
                whileHover={{ rotate: 3 }}
                className="p-1.5 sm:p-2 bg-white rounded-md sm:rounded-lg shadow-xs border border-gray-100"
              >
                <img
                  src={blogDetails.brand.logo.url}
                  alt={blogDetails.brand.name}
                  className="h-10 sm:h-12 w-auto object-contain"
                />
              </motion.div>
              <div>
                <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                  {blogDetails.brand.name}
                </h2>
                <p className="text-xs sm:text-sm text-gray-500">
                  Luxury Fragrance
                </p>
              </div>
            </div>
            <motion.div whileHover={{ x: 2 }}>
              <Link
                to={`/designers/${blogDetails.brand.slug}`}
                className="text-xs sm:text-sm font-medium text-amber-600 hover:text-amber-800 transition-colors inline-flex items-center gap-1"
              >
                View collection
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 sm:h-4 sm:w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </motion.div>
          </motion.div>

          {/* Main Accords Section - Compact on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white p-4 sm:p-5 rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
          >
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                Fragrance Profile
              </h2>
              <span className="text-[10px] sm:text-xs font-medium px-2 py-0.5 sm:px-2 sm:py-1 bg-gray-100 text-gray-600 rounded-full">
                Main Accords
              </span>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-3 sm:space-y-4"
            >
              {blogDetails.accords.map((accord, index) => (
                <motion.div
                  key={accord.name}
                  variants={itemVariants}
                  whileHover={{ scale: 1.01 }}
                  className="group"
                >
                  <div className="flex justify-between items-center mb-0.5">
                    <span className="text-xs sm:text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                      {accord.name}
                    </span>
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.5 + index * 0.1 }}
                      className="text-[10px] sm:text-xs font-semibold px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-700"
                    >
                      {accord.percentage}%
                    </motion.span>
                  </div>

                  <div className="w-full h-1.5 sm:h-2 rounded-full overflow-hidden bg-[#ededed]">
                    <motion.div
                      custom={accord.percentage}
                      variants={barVariants}
                      initial="hidden"
                      animate="visible"
                      className="h-full rounded-full relative"
                      style={{ backgroundColor: accord.color }}
                      whileHover={{ scaleY: 1.5, originY: 1 }}
                    >
                      <div className="absolute inset-0 bg-white/20"></div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
