import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import useBlogDataStore from "../../../store/BlogDataStore";

const LowerNavbar = () => {
  const { blogData } = useBlogDataStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef(null);

  const mainMenus = [
    { name: "Home", path: "/" },
    { name: "Designers", path: "/designers" },
    { name: "Perfumers", path: "/perfumers" },
    { name: "Notes", path: "/notes" },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Improved search function with better matching
  const filteredBlogs = blogData?.filter((item) => {
    if (!searchQuery) return false;

    const query = searchQuery.toLowerCase();
    const title = item.title.toLowerCase();

    // Check for exact match
    if (title === query) return true;

    // Check if title starts with query
    if (title.startsWith(query)) return true;

    // Check if title contains query as whole words
    const words = title.split(/\s+/);
    if (words.some((word) => word === query)) return true;

    // Check for partial matches
    return title.includes(query);
  });

  return (
    <nav className="bg-[#cc081c] text-white shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 relative">
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              className="text-white focus:outline-none p-2 rounded-full hover:bg-white/20 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X size={24} className="text-white" />
              ) : (
                <Menu size={24} />
              )}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1 items-center">
            {mainMenus.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="relative px-2 py-2 group"
              >
                <Link
                  to={item.path}
                  className="font-medium text-base lg:text-lg transition-colors duration-200 hover:text-white/90 relative px-3 py-1.5 rounded-lg hover:bg-white/10"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Search Bar - Responsive Positioning */}
          <div className="flex-1 md:flex-none relative" ref={searchRef}>
            <motion.div
              className="relative w-full"
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Search fragrances..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  className="w-full md:w-64 lg:w-80 xl:w-96 bg-white/90 text-black rounded-full px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-white/80 transition-all duration-300 hover:bg-white text-sm md:text-base placeholder-gray-600"
                />
                <motion.div
                  animate={{
                    color: isSearchFocused ? "#c8102e" : "#4b5563",
                    scale: isSearchFocused ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
                >
                  <Search size={18} />
                </motion.div>
              </div>

              {/* Search Results Dropdown */}
              <AnimatePresence>
                {isSearchFocused && searchQuery && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full mt-2 w-full bg-white text-black rounded-lg shadow-lg z-50 overflow-hidden max-h-80 overflow-y-auto"
                  >
                    {filteredBlogs.length === 0 ? (
                      <div className="p-4 text-sm text-gray-500">
                        No results found for "{searchQuery}"
                      </div>
                    ) : (
                      <>
                        <div className="p-2 text-xs text-gray-500 border-b">
                          {filteredBlogs.length} results found
                        </div>
                        {filteredBlogs.map((item) => (
                          <Link
                            key={item.slug}
                            to={`/blogs/${item.slug}`}
                            className="flex items-center p-3 hover:bg-gray-100 transition-colors border-b last:border-b-0"
                            onClick={() => {
                              setSearchQuery("");
                              setIsSearchFocused(false);
                            }}
                          >
                            <img
                              src={item.image1?.url}
                              alt={item.title}
                              className="w-12 h-12 object-cover rounded mr-3"
                            />
                            <div>
                              <div className="text-sm font-medium">
                                {highlightMatch(item.title, searchQuery)}
                              </div>
                              {item.designer && (
                                <div className="text-xs text-gray-500">
                                  {item.designer}
                                </div>
                              )}
                            </div>
                          </Link>
                        ))}
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-[#a00d26] w-full z-50 overflow-hidden  rounded-2xl shadow-lg"
            >
              <div className="flex flex-col items-center py-4 space-y-1 px-4">
                {mainMenus.map((item) => (
                  <motion.div
                    key={item.name}
                    whileTap={{ scale: 0.95 }}
                    className="w-full"
                  >
                    <Link
                      to={item.path}
                      className="block w-full text-center px-6 py-3 text-lg font-medium hover:bg-white/10 transition-colors rounded-md"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

// Helper function to highlight matching text
function highlightMatch(text, query) {
  if (!query) return text;

  const regex = new RegExp(`(${query})`, "gi");
  return text.split(regex).map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <span key={i} className="bg-yellow-200 text-black">
        {part}
      </span>
    ) : (
      part
    )
  );
}

export default LowerNavbar;
