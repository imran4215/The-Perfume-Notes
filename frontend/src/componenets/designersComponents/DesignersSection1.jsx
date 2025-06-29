import { Link } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import useDesignerDataStore from "../../store/DesignerDataStore";
import Loading from "../Loading";
import Error404 from "../Error404";
import { debounce } from "lodash";

export default function DesignersSection1() {
  const { designerData, loading, error, fetchDesignerData } =
    useDesignerDataStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDesigners, setFilteredDesigners] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const designersPerPage = 20; // Adjust based on your needs

  useEffect(() => {
    fetchDesignerData();
  }, []);

  const filterDesigners = useCallback(
    debounce((term, data) => {
      if (term.trim() === "") {
        setFilteredDesigners(data);
      } else {
        const filtered = data.filter((designer) =>
          designer.name.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredDesigners(filtered);
      }
      setCurrentPage(1); // Reset to first page when filtering
    }, 300),
    []
  );

  useEffect(() => {
    if (designerData && designerData.length > 0) {
      filterDesigners(searchTerm, designerData);
    }
    return () => filterDesigners.cancel();
  }, [searchTerm, designerData, filterDesigners]);

  const paginatedDesigners = filteredDesigners.slice(
    (currentPage - 1) * designersPerPage,
    currentPage * designersPerPage
  );

  const totalPages = Math.ceil(filteredDesigners.length / designersPerPage);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error404 error={error} />;
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto mt-[-10px]">
        {/* Heading */}
        <div className="text-center mb-8 relative">
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            <span className="relative inline-block">
              <span className="relative z-10">Most Popular</span>
              <span className="absolute bottom-0 left-0 w-full h-3 bg-amber-100 opacity-70 -z-0"></span>
            </span>
            <br />
            <span className="font-light">Perfume Designers</span>
          </h2>
          <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto relative">
            <span className="relative z-10 px-2 bg-white">
              Choose your perfect fragrance
            </span>
            <span className="absolute top-1/2 left-0 w-full h-px bg-gray-200 -z-0"></span>
          </p>

          {/* Search Input */}
          <div className="mt-8 max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search designers..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute right-3 top-3 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Designers Grid */}
        {paginatedDesigners.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
              {paginatedDesigners.map((designer) => (
                <Link
                  to={`/designers/${designer.slug}`}
                  key={designer.slug}
                  className="group transition-transform duration-200 hover:-translate-y-1"
                >
                  <div className="bg-white rounded-xl p-4 sm:p-6 flex flex-col items-center h-full border border-gray-100 group-hover:border-amber-100 group-hover:shadow-lg">
                    <div className="w-28 h-28 sm:w-40 sm:h-40 mb-4 sm:mb-6 rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center p-3 sm:p-4 transition-transform duration-300 group-hover:scale-105">
                      <img
                        src={designer.logo.url}
                        alt={designer.name}
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="text-lg sm:text-xl font-medium text-gray-900 text-center">
                      {designer.name}
                    </h3>
                    <div className="mt-2 w-8 h-0.5 bg-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8 space-x-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="px-4 py-2">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">
              {searchTerm.trim() === ""
                ? "No designers available at the moment."
                : `No designers found for "${searchTerm}"`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
