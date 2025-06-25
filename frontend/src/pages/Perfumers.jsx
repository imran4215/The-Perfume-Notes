import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import usePerfumerDataStore from "../store/PerfumerDataStore";
import Loading from "../componenets/Loading";
import Error404 from "../componenets/Error404";
import { Helmet } from "react-helmet-async";

function Perfumers() {
  const { perfumerData, loading, error, fetchPerfumerData } =
    usePerfumerDataStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPerfumers, setFilteredPerfumers] = useState([]);

  useEffect(() => {
    fetchPerfumerData();
  }, []);

  useEffect(() => {
    if (perfumerData && perfumerData.length > 0) {
      if (searchTerm.trim() === "") {
        setFilteredPerfumers(perfumerData);
      } else {
        const filtered = perfumerData.filter((perfumer) =>
          perfumer.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPerfumers(filtered);
      }
    }
  }, [searchTerm, perfumerData]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error404 error={error} />;
  }

  return (
    <div className="bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Meta tags for SEO */}
      <Helmet>
        <title>Master Perfumers | Explore Fragrance Creators</title>
        <meta
          name="description"
          content="Discover the talented perfumers behind the world's most iconic fragrances. Explore their profiles, creations, and unique styles."
        />
        <meta property="og:title" content="Master Perfumers" />
        <meta
          property="og:description"
          content="Browse through the list of renowned perfumers and explore their fragrance creations and legacy."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://theperfumenotes.com/perfumers"
        />
      </Helmet>

      <div className="max-w-7xl mx-auto">
        {/* Centered Heading with Search Below */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            <span className="relative inline-block">
              <span className="relative z-10">Master</span>
              <span className="absolute bottom-0 left-0 w-full h-2 bg-amber-100 opacity-70 -z-0"></span>
            </span>{" "}
            <span className="font-light">Perfumers</span>
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Discover the noses behind iconic fragrances
          </p>

          {/* Centered Search Input */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search perfumers..."
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute right-3 top-2.5 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
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

        {/* Perfumers Grid */}
        {filteredPerfumers.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {filteredPerfumers.map((perfumer) => (
              <Link
                to={`/perfumers/${perfumer.slug}`}
                key={perfumer.slug}
                className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative aspect-square">
                  <img
                    src={perfumer.image.url}
                    alt={perfumer.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-2 text-center">
                  <h3 className="text-sm font-medium text-gray-900 line-clamp-1">
                    {perfumer.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {searchTerm.trim() === ""
                ? "No perfumers available at the moment."
                : `No perfumers found for "${searchTerm}"`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Perfumers;
