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
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Meta tags for SEO */}
      <Helmet>
        <title>Master Perfumers | Explore Fragrance Creators</title>
        <meta
          name="description"
          content="Discover the talented perfumers behind the world’s most iconic fragrances. Explore their profiles, creations, and unique styles."
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
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-center mb-14 relative"
        >
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            <span className="relative inline-block">
              <span className="relative z-10">Choose Your</span>
              <span className="absolute bottom-0 left-0 w-full h-3 bg-amber-100 opacity-70 -z-0"></span>
            </span>
            <br />
            <span className="font-light">Best Perfumer</span>
          </h2>
          <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto relative">
            <span className="relative z-10 px-2 bg-white">
              Discover the masters behind your favorite fragrances
            </span>
            <span className="absolute top-1/2 left-0 w-full h-px bg-gray-200 -z-0"></span>
          </p>
        </motion.div>

        {/* Perfumers Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
        >
          {perfumerData.map((perfumer, index) => (
            <motion.div
              key={perfumer._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -3 }}
            >
              <Link
                to={`/perfumers/${perfumer.slug}`}
                className="group block bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative pt-[100%] overflow-hidden">
                  <motion.img
                    src={perfumer.image.url}
                    alt={perfumer.name}
                    className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    whileHover={{ scale: 1.05 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-3">
                  <h3 className="text-base font-semibold text-gray-900">
                    {perfumer.name}
                  </h3>
                  <p className="text-sm text-gray-600">{perfumer.title}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default Perfumers;
