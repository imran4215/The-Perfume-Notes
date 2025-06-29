import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAdminDataStore from "../../store/AdminDataStore";
import JoditEditor from "jodit-react";
import { toast } from "react-toastify";
import axios from "axios";

function AddNote() {
  const editor = React.useRef(null);
  const navigate = useNavigate();
  const { categories, fetchCategoryData } = useAdminDataStore();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    fetchCategoryData();
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    details: "",
    profilePic: null,
    coverPic: null,
    metaTitle: "",
    metaDescription: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation for required fields including metaTitle & metaDescription
    if (
      !formData.name ||
      !formData.category ||
      !formData.metaTitle ||
      !formData.metaDescription
    ) {
      toast.error(
        "Name, Category, Meta Title and Meta Description are required."
      );
      return;
    }

    setLoading(true);

    const submitData = new FormData();
    submitData.append("name", formData.name);
    submitData.append("category", formData.category);
    submitData.append("details", formData.details);
    submitData.append("metaTitle", formData.metaTitle);
    submitData.append("metaDescription", formData.metaDescription);
    if (formData.profilePic)
      submitData.append("profilePic", formData.profilePic);
    if (formData.coverPic) submitData.append("coverPic", formData.coverPic);

    try {
      const response = await axios.post(
        `${BASE_URL}/api/note/addNote`,
        submitData
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("Note added successfully!");
        setTimeout(() => {
          setLoading(false);
          navigate("/admin/all-notes");
        }, 1500);
      } else {
        throw new Error("Failed to add note");
      }
    } catch (error) {
      console.error("Submission error:", error.response?.data || error.message);
      toast.error("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 mt-16 flex justify-center items-start">
      <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-5xl">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Add New Note</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              placeholder="Enter note name"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Meta Title */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Meta Title <span className="text-red-500">*</span>
            </label>
            <input
              name="metaTitle"
              type="text"
              value={formData.metaTitle}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              placeholder="Enter meta title for SEO"
            />
          </div>

          {/* Meta Description */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Meta Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="metaDescription"
              value={formData.metaDescription}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 resize-none"
              placeholder="Enter meta description for SEO"
              rows={3}
            />
          </div>

          {/* Details */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Details
            </label>
            <div className="w-full border border-gray-300 rounded-lg overflow-hidden">
              <JoditEditor
                ref={editor}
                value={formData.details}
                onChange={(newContent) =>
                  setFormData((prev) => ({ ...prev, details: newContent }))
                }
              />
            </div>
          </div>

          {/* Profile Pic Upload with Preview */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Profile Picture
            </label>
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
              <input
                type="file"
                name="profilePic"
                accept="image/*"
                onChange={handleFileChange}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/2"
              />
              {formData.profilePic && (
                <img
                  src={URL.createObjectURL(formData.profilePic)}
                  alt="Profile Preview"
                  className="w-32 h-32 object-cover rounded-md shadow border border-gray-300"
                />
              )}
            </div>
          </div>

          {/* Cover Pic Upload with Preview (Optional) */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Cover Picture{" "}
              <span className="text-gray-500 text-sm">(Optional)</span>
            </label>
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
              <input
                type="file"
                name="coverPic"
                accept="image/*"
                onChange={handleFileChange}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/2"
              />
              {formData.coverPic && (
                <img
                  src={URL.createObjectURL(formData.coverPic)}
                  alt="Cover Preview"
                  className="w-32 h-32 object-cover rounded-md shadow border border-gray-300"
                />
              )}
            </div>
          </div>

          {/* Submit Button with Loading */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 text-white rounded-lg font-semibold transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "Adding..." : "Add Note"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddNote;
