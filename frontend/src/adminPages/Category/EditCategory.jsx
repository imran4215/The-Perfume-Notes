import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAdminDataStore from "../../store/AdminDataStore";
import axios from "axios";
import { toast } from "react-toastify";

function EditCategory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { categories } = useAdminDataStore();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  // Find the selected category
  useEffect(() => {
    const category = categories.find((cat) => cat._id === id);
    if (category) {
      setName(category.name);
    } else {
      toast.error("Category not found");
      navigate("/admin/all-categories");
    }
  }, [categories, id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Category name is required");
      return;
    }

    setLoading(true);
    try {
      await axios.put(`${BASE_URL}/api/category/updateCategory/${id}`, {
        name,
      });
      toast.success("Category updated successfully");
      navigate("/admin/all-categories");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-start pt-16 bg-gray-100 px-4 mt-16">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Edit Category</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-gray-700 font-semibold mb-2"
            >
              Category Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter category name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold text-white transition-colors ${
              loading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "Updating..." : "Update Category"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditCategory;
