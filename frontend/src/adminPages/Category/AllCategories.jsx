import React, { useEffect, useState } from "react";
import useAdminDataStore from "../../store/AdminDataStore";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loading from "../../componenets/Loading";
import Error404 from "../../componenets/Error404";

function AllCategories() {
  const { categories, fetchCategoryData, removeCategory, loading, error } =
    useAdminDataStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingId, setLoadingId] = useState(null);
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    fetchCategoryData();
  }, []);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error404 error={error} />;
  }

  // Filter categories based on search term
  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;

    setLoadingId(id);
    try {
      await axios.delete(`${BASE_URL}/api/category/deleteCategory/${id}`);
      removeCategory(id);
      toast.success("Category deleted successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoadingId(null);
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit-category/${id}`);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 pt-20">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          All Categories
        </h1>

        <input
          type="text"
          placeholder="Search categories..."
          className="mb-6 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-indigo-600 text-white">
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.length === 0 && (
                <tr>
                  <td colSpan={2} className="text-center py-4 text-gray-500">
                    No categories found
                  </td>
                </tr>
              )}

              {filteredCategories.map(({ _id, name }) => (
                <tr key={_id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{name}</td>
                  <td className="px-4 py-3 text-center space-x-3">
                    <button
                      onClick={() => handleEdit(_id)}
                      className="text-indigo-600 hover:text-indigo-800 font-semibold"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(_id)}
                      disabled={loadingId === _id}
                      className={`text-red-600 hover:text-red-800 font-semibold ${
                        loadingId === _id ? "cursor-not-allowed opacity-50" : ""
                      }`}
                    >
                      {loadingId === _id ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AllCategories;
