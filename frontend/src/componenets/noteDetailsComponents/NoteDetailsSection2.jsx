import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import useBlogDataStore from "../../store/BlogDataStore";

export default function NoteDetailsSection2({ noteSlug }) {
  const { blogData } = useBlogDataStore();

  const noteCreations = blogData.filter((perfume) =>
    ["top", "middle", "base"].some((level) =>
      perfume.notes[level].some((note) => note.slug === noteSlug)
    )
  );

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 12;
  const totalPages = Math.ceil(noteCreations.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const visibleNotes = noteCreations.slice(
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
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Popular Creations with This Note
        </h2>
        <div className="mt-4 h-1 w-20 bg-amber-400 mx-auto"></div>
      </motion.div>

      {noteCreations.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">
            No perfumes available with this note at the moment.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-6">
            {visibleNotes.map((blog) => (
              <Link
                to={`/perfume/${blog.slug}`}
                key={blog.slug}
                className="group block"
              >
                <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={blog.image1.url}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-2 sm:p-4">
                    <h3 className="font-medium text-gray-800 text-sm line-clamp-3">
                      {blog.title}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination controls */}
          {noteCreations.length > itemsPerPage && (
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
