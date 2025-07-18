// src/pages/admin/EditAuthor.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaUpload, FaSpinner } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import useAdminDataStore from "../../store/AdminDataStore";

function EditAuthor() {
  /* ────────── ROUTE + GLOBAL STORE ────────── */
  const { id } = useParams(); // /edit-author/:id
  const { authors } = useAdminDataStore(); // list already fetched elsewhere
  const author = authors.find((a) => a._id === id);
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  /* ────────── LOCAL STATE ────────── */
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    bio: "",
    authorPic: null,
    metaTitle: "",
    metaDescription: "",
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  /* ────────── POPULATE WHEN AUTHOR ARRIVES ────────── */
  useEffect(() => {
    if (author) {
      setFormData({
        name: author.name || "",
        title: author.title || "",
        bio: author.bio || "",
        authorPic: null,
        metaTitle: author.metaTitle || "",
        metaDescription: author.metaDescription || "",
      });
      setPreviewImage(author.authorPic?.url || null);
    } else {
      toast.error("Author not found.");
      navigate("/admin/all-authors");
    }
  }, [author, navigate]);

  /* ────────── INPUT HANDLERS ────────── */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFormData((prev) => ({ ...prev, authorPic: file }));
    const reader = new FileReader();
    reader.onloadend = () => setPreviewImage(reader.result);
    reader.readAsDataURL(file);
  };

  /* ────────── SUBMIT ────────── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("title", formData.title);
      data.append("bio", formData.bio);
      data.append("metaTitle", formData.metaTitle);
      data.append("metaDescription", formData.metaDescription);
      if (formData.authorPic) data.append("authorPic", formData.authorPic);

      await axios.put(`${BASE_URL}/api/author/updateAuthor/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Author updated successfully! Redirecting...");
      setTimeout(() => navigate("/admin/all-authors"), 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update author.", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  /* ────────── RENDER ────────── */
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <ToastContainer />
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 mb-6"
        >
          <FaArrowLeft /> Back to Authors
        </button>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 py-5 px-6">
            <h1 className="text-2xl font-bold text-white">Edit Author</h1>
            <p className="text-indigo-100 mt-1">
              Modify the details below to update this author&#39;s profile
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* ───── Name + Title ───── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Author Name*"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <Input
                label="Title (optional)"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            {/* ───── Bio ───── */}
            <Textarea
              label="Bio*"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              required
              rows={5}
            />

            {/* ───── Meta fields ───── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Meta Title*"
                name="metaTitle"
                value={formData.metaTitle}
                onChange={handleChange}
                required
                placeholder="SEO title for this author page"
              />
              <Input
                label="Meta Description*"
                name="metaDescription"
                value={formData.metaDescription}
                onChange={handleChange}
                required
                placeholder="Short SEO description"
              />
            </div>

            {/* ───── Image upload ───── */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Author Picture
              </label>
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-1">
                  <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <FaUpload className="text-gray-400 text-3xl mb-2" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG (Max 5 MB)
                      </p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
                {previewImage && (
                  <div className="flex flex-col items-center">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
                    />
                    <p className="text-xs text-gray-500 mt-2">Image Preview</p>
                  </div>
                )}
              </div>
            </div>

            {/* ───── Buttons ───── */}
            <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-5 py-2.5 border rounded-lg text-sm text-gray-700 hover:bg-gray-50"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium text-white flex items-center gap-2 ${
                  isLoading
                    ? "bg-indigo-400"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >
                {isLoading ? (
                  <>
                    <FaSpinner className="animate-spin" /> Saving…
                  </>
                ) : (
                  "Update Author"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

/* ---------- Small Presentational Inputs ---------- */
const Input = ({ label, ...rest }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      {...rest}
      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
    />
  </div>
);

const Textarea = ({ label, rows = 3, ...rest }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <textarea
      rows={rows}
      {...rest}
      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
    />
  </div>
);

export default EditAuthor;
