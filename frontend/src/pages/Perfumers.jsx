import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import usePerfumerDataStore from "../store/PerfumerDataStore";
import Loading from "../componenets/Loading";
import Error404 from "../componenets/Error404";
import { Helmet } from "react-helmet-async";

function Perfumers() {
  const { perfumerData, loading, error, fetchPerfumerData } =
    usePerfumerDataStore();

  useEffect(() => {
    fetchPerfumerData();
  }, []);

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
        {/* Compact Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            <span className="relative inline-block">
              <span className="relative z-10">Master</span>
              <span className="absolute bottom-0 left-0 w-full h-2 bg-amber-100 opacity-70 -z-0"></span>
            </span>{" "}
            <span className="font-light">Perfumers</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Discover the noses behind iconic fragrances
          </p>
        </motion.div>

        {/* Compact Perfumers Grid - 6 items per row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4"
        >
          {perfumerData.map((perfumer) => (
            <Link to={`/perfumers/${perfumer.slug}`} key={perfumer._id}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true, margin: "-50px" }}
                className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="relative aspect-square">
                  <img
                    src={perfumer.image.url}
                    alt={perfumer.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-2 text-center">
                  <h3 className="text-sm font-medium text-gray-900 line-clamp-1">
                    {perfumer.name}
                  </h3>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default Perfumers;
