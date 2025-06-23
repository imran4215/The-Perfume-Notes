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
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredNotes, setFilteredNotes] = useState({});
  const [hasSearched, setHasSearched] = useState(false);

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
      setFilteredNotes(grouped);

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

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredNotes(groupedNotes);
      setHasSearched(false);
    } else {
      const filtered = {};
      Object.keys(groupedNotes).forEach((category) => {
        const matchedNotes = groupedNotes[category].filter((note) =>
          note.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (matchedNotes.length > 0) {
          filtered[category] = matchedNotes;
        }
      });
      setFilteredNotes(filtered);
      setHasSearched(true);
    }
  }, [searchTerm, groupedNotes]);

  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  if (loading) return <Loading />;
  if (error) return <Error404 error={error} />;

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
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

      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-serif tracking-tight">
          Perfume <span className="text-amber-600">Notes</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          Discover the natural ingredients that compose our exquisite
          fragrances.
        </p>

        <div className="mt-8 max-w-md mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search notes..."
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

      <div className="max-w-7xl mx-auto space-y-12">
        {Object.keys(filteredNotes).length > 0 ? (
          Object.entries(filteredNotes).map(([category, notes]) => (
            <div key={category} className="space-y-6">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleCategory(category)}
              >
                <h2 className="text-2xl font-bold text-gray-800 capitalize flex items-center">
                  <span
                    className={`inline-block mr-2 transition-transform ${
                      expandedCategories[category] ? "" : "-rotate-90"
                    }`}
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
                  </span>
                  {category}
                  <span className="ml-2 text-sm bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                    {notes.length}
                  </span>
                </h2>
                <span className="text-sm text-gray-500">
                  {expandedCategories[category] ? "Hide" : "Show"}
                </span>
              </div>

              {expandedCategories[category] && (
                <div className="grid grid-cols-4 xs:grid-cols-5 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-9 gap-4">
                  {notes.map((note) => (
                    <Link to={`/notes/${note.slug}`} key={note._id}>
                      <motion.div
                        initial="hidden"
                        animate="show"
                        variants={item}
                        className="group relative bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md flex flex-col h-full"
                      >
                        <div className="aspect-square w-full overflow-hidden">
                          <img
                            src={note.profilePic.url}
                            alt={note.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                        <div className="p-2 text-center flex-grow flex flex-col justify-end">
                          <h3 className="text-gray-900 font-medium text-[13px] line-clamp-2">
                            {note.name}
                          </h3>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500">
              {hasSearched
                ? `No notes found for "${searchTerm}"`
                : "No notes available at the moment."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;
