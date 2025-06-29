import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import useBlogDataStore from "../../store/BlogDataStore";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const CATEGORIES = [
  { key: "all", label: "All" },
  { key: "men", label: "For Men" },
  { key: "women", label: "For Women" },
  { key: "unisex", label: "Unisex" },
];

const itemsPerPage = 12;

export default function DesignerDetailsSection2({
  brandSlug,
  designerDetails,
}) {
  const { blogData } = useBlogDataStore();
  const [currentPage, setCurrentPage] = useState(0);
  const [category, setCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter, sort, and paginate perfumes
  const { visiblePerfumes, totalPages } = useMemo(() => {
    let perfumes = blogData.filter(
      (perfume) => perfume.brand.slug === brandSlug
    );

    // Apply category filter if not "all"
    if (category !== "all") {
      perfumes = perfumes.filter((p) => p.category === category);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      perfumes = perfumes.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort by releaseDate in descending order (most recent first)
    perfumes.sort(
      (a, b) => Number(b.releaseDate || 0) - Number(a.releaseDate || 0)
    );

    const startIndex = currentPage * itemsPerPage;
    const total = Math.ceil(perfumes.length / itemsPerPage);
    const paginated = perfumes.slice(startIndex, startIndex + itemsPerPage);

    return {
      visiblePerfumes: paginated,
      totalPages: total,
    };
  }, [blogData, brandSlug, category, currentPage, searchQuery]);

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    setCurrentPage(0);
  };

  const goToPrevious = () => setCurrentPage((prev) => Math.max(prev - 1, 0));
  const goToNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Two-column layout for logo/name and search/categories */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-6">
          {/* Left: Logo and Name */}
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg bg-white p-4 shadow-lg border border-gray-200 flex items-center justify-center">
              <img
                src={designerDetails.logo.url}
                alt={`${designerDetails.name} logo`}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
                {designerDetails.name.toUpperCase()}
              </h1>
              <span className="text-base sm:text-lg font-medium text-amber-700">
                Perfumes
              </span>
            </div>
          </div>

          {/* Right: Search and Category Filters */}
          <div className="flex flex-col items-end gap-4 w-full sm:w-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(0);
              }}
              placeholder="Search perfumes..."
              className="w-full sm:w-72 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-base text-gray-800 bg-white shadow-sm"
            />
            <div className="flex flex-wrap justify-end gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c.key}
                  onClick={() => handleCategoryChange(c.key)}
                  className={`px-3 py-1.5 rounded-lg text-sm sm:text-base font-medium border ${
                    category === c.key
                      ? "bg-[#cc081c] text-white border-[#cc081c]"
                      : "bg-white text-gray-800 hover:bg-gray-100 border-gray-300"
                  } transition-all duration-200 hover:shadow-sm`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Heading Above Item List */}
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6">
          Explore Our Collection
        </h2>

        {/* Perfume Grid */}
        {visiblePerfumes.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-600 text-base">No perfumes found.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-6">
              {visiblePerfumes.map((blog) => (
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
                      <div className="absolute top-2 right-2 bg-orange-400 text-white text-xs sm:text-sm font-semibold px-2 py-1 rounded-full shadow-sm">
                        {blog.releaseDate}
                      </div>
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
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-8 space-x-4">
                <button
                  onClick={goToPrevious}
                  disabled={currentPage === 0}
                  className={`p-2 rounded-full ${
                    currentPage === 0
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-gray-800 hover:bg-gray-200"
                  } transition-all duration-200`}
                >
                  <FiChevronLeft size={24} />
                </button>
                <span className="text-base text-gray-700 font-medium">
                  Page {currentPage + 1} of {totalPages}
                </span>
                <button
                  onClick={goToNext}
                  disabled={currentPage === totalPages - 1}
                  className={`p-2 rounded-full ${
                    currentPage === totalPages - 1
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-gray-800 hover:bg-gray-200"
                  } transition-all duration-200`}
                >
                  <FiChevronRight size={24} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
