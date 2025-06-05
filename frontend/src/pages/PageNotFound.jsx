import { motion } from "framer-motion";
import { FiFrown, FiHome, FiCompass } from "react-icons/fi";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-6 text-center"
    >
      {/* Animated 404 number */}
      <motion.div
        initial={{ scale: 0.8, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="relative mb-8"
      >
        <span className="text-9xl font-bold text-gray-800 opacity-10 absolute -top-4 left-1/2 transform -translate-x-1/2">
          404
        </span>
        <div className="relative">
          <motion.div
            animate={{ rotate: [-10, 10, -10] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          >
            <FiFrown className="w-24 h-24 text-amber-500 mx-auto" />
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mt-4">
            Page Not Found
          </h1>
        </div>
      </motion.div>

      {/* Message */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-xl text-gray-600 max-w-2xl mb-12"
      >
        Oops! The page you're looking for doesn't exist or has been moved.
      </motion.p>

      {/* Animated divider */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "50%" }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-8"
      />

      {/* Action buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <Link to="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 bg-amber-500 text-white rounded-lg font-medium shadow-lg hover:bg-amber-600 transition-colors"
          >
            <FiHome className="w-5 h-5" />
            Return Home
          </motion.button>
        </Link>

        <Link to="/explore">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium shadow-sm hover:bg-gray-50 transition-colors"
          >
            <FiCompass className="w-5 h-5" />
            Explore Collections
          </motion.button>
        </Link>
      </motion.div>

      {/* Floating decorative elements */}
      <motion.div
        animate={{
          y: [0, -15, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="absolute left-10 bottom-1/4 text-gray-200 text-7xl"
      >
        ⎈
      </motion.div>
      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: 0.5,
        }}
        className="absolute right-12 top-1/3 text-gray-200 text-6xl"
      >
        ✧
      </motion.div>
    </motion.div>
  );
}

export default PageNotFound;
