import React, { useState } from "react";
import { Link } from "react-router-dom";
import useBlogDataStore from "../../store/BlogDataStore";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function DesignerDetailsSection2({ brandSlug, brandName }) {
  const { blogData } = useBlogDataStore();
  const [currentPage, setCurrentPage] = useState(0);

  // Filter perfumes based on the brand name from blogData
  const brandsPerfumes = blogData.filter(
    (perfume) => perfume.brand.slug === brandSlug
  );

  // Pagination logic
  const itemsPerPage = 12;
  const totalPages = Math.ceil(brandsPerfumes.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const visiblePerfumes = brandsPerfumes.slice(
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
    <div className="p-4 mt-6 sm:mt-10 max-w-7xl mx-auto bg-gray-50 relative">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8 text-center">
        Perfumes of {brandName.toUpperCase()}
      </h1>

      {brandsPerfumes.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">
            No Related Perfumes available at the moment.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-6">
            {visiblePerfumes.map((blog) => (
              <Link
                to={`/perfume/${blog.slug}`}
                key={blog.slug}
                className="group"
              >
                <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
                  <div className="relative overflow-hidden aspect-square">
                    <img
                      src={blog.image1.url}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <div className="absolute top-1 right-1 bg-orange-300 text-white text-[10px] sm:text-xs font-semibold px-1.5 py-0.5 rounded shadow-md">
                      {blog.releaseDate}
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 sm:p-4"></div>
                  </div>
                  <div className="p-2 sm:p-4">
                    <h3 className="font-medium text-gray-800 text-xs sm:text-base truncate">
                      {blog.title}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination controls */}
          {brandsPerfumes.length > itemsPerPage && (
            <div className="flex justify-center items-center mt-6 space-x-4">
              <button
                onClick={goToPrevious}
                disabled={currentPage === 0}
                className={`p-2 rounded-full ${
                  currentPage === 0
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
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
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                <FiChevronRight size={24} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
