import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import useBlogDataStore from "../../store/BlogDataStore";

export default function PerfumerDetailsSection2({ perfumerDetails }) {
  const { blogData } = useBlogDataStore();
  const perfumerName = perfumerDetails.name.trim().toLowerCase();

  // Filter perfumes based on the perfumer's name from blogData
  const perfumerCreations = blogData.filter(
    (perfume) => perfume.perfumer.name.trim().toLowerCase() === perfumerName
  );

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 12;
  const totalPages = Math.ceil(perfumerCreations.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const visiblePerfumes = perfumerCreations.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const goToPrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const goToNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Creations by {perfumerDetails.name}
        </h2>
        <div className="mt-4 h-1 w-20 bg-amber-400 mx-auto"></div>
      </motion.div>

      {perfumerCreations.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">
            No perfumes available for this perfumer at the moment.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {visiblePerfumes.map((perfume, index) => (
              <Link
                to={`/blogs/${perfume.slug}`}
                key={perfume._id}
                className="group"
              >
                <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
                  <div className="relative overflow-hidden aspect-square">
                    <img
                      src={perfume.image1.url}
                      alt={perfume.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 sm:p-4"></div>
                  </div>
                  <div className="p-2 sm:p-4">
                    <h3 className="font-medium text-gray-800 text-xs sm:text-base truncate">
                      {perfume.title}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination controls */}
          {perfumerCreations.length > itemsPerPage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex justify-center items-center mt-10 space-x-4"
            >
              <button
                onClick={goToPrevious}
                disabled={currentPage === 0}
                className={`p-2 rounded-full ${
                  currentPage === 0
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-gray-700 hover:bg-gray-100"
                } transition-colors duration-200`}
              >
                <FiChevronLeft size={24} />
              </button>

              <span className="text-sm text-gray-600">
                Page {currentPage + 1} of {totalPages}
              </span>

              <button
                onClick={goToNext}
                disabled={currentPage === totalPages - 1}
                className={`p-2 rounded-full ${
                  currentPage === totalPages - 1
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-gray-700 hover:bg-gray-100"
                } transition-colors duration-200`}
              >
                <FiChevronRight size={24} />
              </button>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
}
