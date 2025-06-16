import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import useNoteDataStore from "../store/NoteDataStore";
import Loading from "../componenets/Loading";
import Error404 from "../componenets/Error404";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Notes = () => {
  const { noteData, fetchNoteData, loading, error } = useNoteDataStore();
  const [expandedCategories, setExpandedCategories] = useState({});
  const [groupedNotes, setGroupedNotes] = useState({});

  useEffect(() => {
    fetchNoteData();
  }, [fetchNoteData]);

  useEffect(() => {
    if (noteData && noteData.length > 0) {
      const grouped = noteData.reduce((acc, note) => {
        const categoryName = note.category?.name || "Uncategorized";
        if (!acc[categoryName]) {
          acc[categoryName] = [];
        }
        acc[categoryName].push(note);
        return acc;
      }, {});

      setGroupedNotes(grouped);

      const initialExpandedState = Object.keys(grouped).reduce(
        (acc, category) => {
          acc[category] = true;
          return acc;
        },
        {}
      );
      setExpandedCategories(initialExpandedState);
    }
  }, [noteData]);

  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const categoryHeader = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  if (loading) return <Loading />;
  if (error) return <Error404 error={error} />;

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      {/* Meta tags for SEO */}
      <Helmet>
        <title>Perfume Notes | Explore Fragrance Notes by Category</title>
        <meta
          name="description"
          content="Browse and explore all perfume notes grouped by category. Discover ingredients used in your favorite fragrances."
        />
        <meta
          property="og:title"
          content="All Perfume Notes | Explore Fragrance Notes"
        />
        <meta
          property="og:description"
          content="Detailed list of perfume notes organized by type. Learn about fragrance ingredients."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://theperfumenotes.com/notes" />
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-serif tracking-tight">
          Perfume <span className="text-amber-600">Notes</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          Discover the natural ingredients that compose our exquisite
          fragrances.
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto space-y-12">
        {Object.keys(groupedNotes).length > 0 ? (
          Object.entries(groupedNotes).map(([category, notes]) => (
            <div key={category} className="space-y-6">
              <motion.div
                variants={categoryHeader}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleCategory(category)}
              >
                <h2 className="text-2xl font-bold text-gray-800 capitalize flex items-center">
                  <motion.span
                    animate={{ rotate: expandedCategories[category] ? 0 : -90 }}
                    className="inline-block mr-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </motion.span>
                  {category}
                  <span className="ml-2 text-sm bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                    {notes.length}
                  </span>
                </h2>
                <span className="text-sm text-gray-500">
                  {expandedCategories[category] ? "Hide" : "Show"}
                </span>
              </motion.div>

              {expandedCategories[category] && (
                <motion.div
                  variants={container}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-100px" }}
                  className="grid grid-cols-4 xs:grid-cols-5 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-9 gap-4"
                >
                  {notes.map((note) => (
                    <Link to={`/notes/${note.slug}`} key={note._id}>
                      <motion.div
                        variants={item}
                        whileHover={{ y: -5, scale: 1.03 }}
                        className="group relative bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md flex flex-col h-full"
                      >
                        <div className="aspect-square w-full overflow-hidden">
                          <img
                            src={note.profilePic.url}
                            alt={note.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2"></div>
                        <div className="p-2 text-center flex-grow flex flex-col justify-end">
                          <h3 className="text-gray-900 font-medium text-[13px] line-clamp-2">
                            {note.name}
                          </h3>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </motion.div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500">No notes available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;
