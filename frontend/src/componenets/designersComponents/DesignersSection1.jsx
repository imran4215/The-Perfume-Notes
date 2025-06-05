import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import useDesignerDataStore from "../../store/DesignerDataStore";
import Loading from "../Loading";
import Error404 from "../Error404";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

export default function DesignersSection1() {
  const { designerData, loading, error, fetchDesignerData } =
    useDesignerDataStore();

  useEffect(() => {
    fetchDesignerData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error404 error={error} />;
  }

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto mt-[-10px]">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-center mb-16 relative"
        >
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
        </motion.div>

        {/* Designers Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6"
        >
          {designerData.map((designer) => (
            <Link to={`/designers/${designer.slug}`} key={designer._id}>
              <motion.div
                variants={itemVariants}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.2 },
                }}
                className="group"
              >
                <div className="bg-white rounded-xl p-4 sm:p-6 flex flex-col items-center transition-all duration-300 h-full border border-gray-100 group-hover:border-amber-100 group-hover:shadow-lg">
                  <div className="w-28 h-28 sm:w-40 sm:h-40 mb-4 sm:mb-6 rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center p-3 sm:p-4 transform group-hover:scale-105 transition-transform duration-300">
                    <img
                      src={designer.logo.url}
                      alt={designer.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="text-lg sm:text-xl font-medium text-gray-900 text-center">
                    {designer.name}
                  </h3>
                  <div className="mt-2 w-8 h-0.5 bg-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
