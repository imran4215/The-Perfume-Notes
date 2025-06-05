import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAdminDataStore from "../../store/AdminDataStore";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaSearch,
  FaStickyNote,
} from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../../componenets/Loading";
import Error404 from "../../componenets/Error404";

function AllNotes() {
  const { notes, fetchNoteData, removeNote, loading, error } =
    useAdminDataStore();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    fetchNoteData();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredNotes = notes.filter((note) =>
    note.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (noteId) => {
    navigate(`/admin/edit-note/${noteId}`);
  };

  const handleDelete = async (noteId) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      try {
        const res = await axios.delete(
          `${BASE_URL}/api/note/deleteNote/${noteId}`
        );
        if (res.status === 200) {
          toast.success("Note deleted successfully!");
          removeNote(noteId);
        }
      } catch (error) {
        console.error("Failed to delete note:", error);
        toast.error("Failed to delete note. Please try again.");
      }
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error404 error={error} />;

  return (
    <div className="min-h-screen p-6 bg-gray-100 mt-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Note Management
            </h1>
            <p className="text-gray-600 mt-1">
              Manage all notes in your system
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search notes..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <button
              onClick={() => navigate("/admin/add-note")}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
            >
              <FaPlus /> Add Note
            </button>
          </div>
        </div>

        {filteredNotes.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <FaStickyNote className="text-gray-400 text-3xl" />
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              {searchTerm ? "No matching notes found" : "No notes available"}
            </h3>
            <p className="text-gray-500 mb-4">
              {searchTerm
                ? "Try adjusting your search query"
                : "Get started by adding a new note"}
            </p>
            {!searchTerm && (
              <button
                onClick={() => navigate("/admin/add-note")}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg inline-flex items-center gap-2"
              >
                <FaPlus /> Add Your First Note
              </button>
            )}
          </div>
        ) : (
          <div className="grid gap-4 grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8">
            {filteredNotes.map((note) => (
              <div
                key={note._id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-2"
              >
                <div className="text-center mb-2">
                  {note.profilePic?.url && (
                    <img
                      src={note.profilePic.url}
                      alt={note.name}
                      className="w-12 h-12 mx-auto rounded-full object-cover mb-1"
                    />
                  )}
                  <h2 className="text-sm font-semibold text-gray-800 truncate">
                    {note.name}
                  </h2>
                </div>

                <div className="flex space-x-1 w-full">
                  <button
                    onClick={() => handleEdit(note._id)}
                    className="flex-1 flex items-center justify-center gap-1 px-2 py-1 text-xs bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(note._id)}
                    className="flex-1 flex items-center justify-center gap-1 px-2 py-1 text-xs bg-red-50 hover:bg-red-100 text-red-600 rounded"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AllNotes;
