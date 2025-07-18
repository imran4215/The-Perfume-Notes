import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus, FaSearch } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import useAdminDataStore from "../../store/AdminDataStore";
import Loading from "../../componenets/Loading";
import Error404 from "../../componenets/Error404";

function AllPerfumers() {
  const { perfumers, fetchPerfumerData, removePerfumer, loading, error } =
    useAdminDataStore();
  const [searchTerm, setSearchTerm] = React.useState("");
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    fetchPerfumerData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error404 error={error} />;
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPerfumers = perfumers.filter(
    (perfumer) =>
      perfumer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      perfumer.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (id, slug) => {
    navigate(`/admin/edit-perfumer/${id}/${slug}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this perfumer?")) {
      try {
        await axios.delete(`${BASE_URL}/api/perfumer/deletePerfumer/${id}`);
        toast.success("Perfumer deleted successfully!");
        removePerfumer(id);
      } catch (err) {
        console.error("Delete error:", err);
        toast.error("Failed to delete perfumer.");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen p-6 bg-gray-100 mt-16 flex justify-center items-center">
        <p className="text-gray-600 text-xl">Loading perfumers...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100 mt-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Perfumer Management
            </h1>
            <p className="text-gray-600 mt-1">
              Manage all perfumers in your system
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search perfumers..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <button
              onClick={() => navigate("/admin/add-perfumer")}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
            >
              <FaPlus /> Add Perfumer
            </button>
          </div>
        </div>

        {filteredPerfumers.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <FaSearch className="text-gray-400 text-3xl" />
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              {searchTerm
                ? "No matching perfumers found"
                : "No perfumers available"}
            </h3>
            <p className="text-gray-500 mb-4">
              {searchTerm
                ? "Try adjusting your search query"
                : "Get started by adding a new perfumer"}
            </p>
            {!searchTerm && (
              <button
                onClick={() => navigate("/admin/add-perfumer")}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg inline-flex items-center gap-2"
              >
                <FaPlus /> Add Your First Perfumer
              </button>
            )}
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {filteredPerfumers.map((perfumer) => (
              <div
                key={perfumer._id}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-4 flex flex-col items-center">
                  <div className="relative mb-4">
                    <img
                      src={perfumer.image.url}
                      alt={perfumer.name}
                      className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md bg-white"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-indigo-100 rounded-full p-2">
                      <div className="bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center">
                        {perfumer.name.charAt(0).toUpperCase()}
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <h2 className="text-lg font-semibold text-gray-800">
                      {perfumer.name}
                    </h2>
                    <p className="text-sm text-indigo-600 mb-1">
                      {perfumer.title}
                    </p>
                  </div>

                  <div className="flex space-x-2 w-full">
                    <button
                      onClick={() => handleEdit(perfumer._id, perfumer.slug)}
                      className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-lg transition-colors"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(perfumer._id)}
                      className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AllPerfumers;
