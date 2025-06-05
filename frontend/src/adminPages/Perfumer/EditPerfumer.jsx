import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaUpload, FaSpinner } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAdminDataStore from "../../store/AdminDataStore";
import JoditEditor from "jodit-react";

function EditPerfumer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { perfumers } = useAdminDataStore();
  const editor = useRef(null);
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const perfumer = perfumers.find((p) => p._id === id);

  const [formData, setFormData] = useState({
    name: "",
    title: "",
    intro: "",
    bio: "",
    image: null,
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (perfumer) {
      setFormData({
        name: perfumer.name || "",
        title: perfumer.title || "",
        intro: perfumer.intro || "",
        bio: perfumer.bio || "",
        image: null,
      });
      setPreviewImage(perfumer.image?.url || null);
    } else {
      toast.error("Perfumer not found.");
      navigate("/admin/all-perfumers");
    }
  }, [perfumer, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("title", formData.title);
      formDataToSend.append("intro", formData.intro);
      formDataToSend.append("bio", formData.bio);
      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }

      await axios.put(
        `${BASE_URL}/api/perfumer/updatePerfumer/${id}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Perfumer updated successfully! Redirecting...");
      setTimeout(() => navigate("/admin/all-perfumers"), 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update perfumer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <ToastContainer />
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 mb-6 transition-colors"
        >
          <FaArrowLeft /> Back to Perfumers
        </button>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-500 to-indigo-400 py-5 px-6">
            <h1 className="text-2xl font-bold text-white">Edit Perfumer</h1>
            <p className="text-indigo-100 mt-1">
              Update the perfumer's profile information below.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Name*
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Title */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Title*
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Intro */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Intro*
              </label>
              <textarea
                name="intro"
                value={formData.intro}
                onChange={handleChange}
                rows={3}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Bio*
              </label>
              <JoditEditor
                ref={editor}
                value={formData.bio}
                onChange={(newContent) =>
                  setFormData((prev) => ({
                    ...prev,
                    bio: newContent,
                  }))
                }
              />
              {/* <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={5}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              /> */}
            </div>

            {/* Image Upload */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Profile Image
              </label>
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-1">
                  <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <FaUpload className="text-gray-400 text-3xl mb-2" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag & drop
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG (Max 5MB)
                      </p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>

                {previewImage && (
                  <div className="flex flex-col items-center">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-32 h-32 object-contain rounded-full border-4 border-white shadow-md bg-white"
                    />
                    <p className="text-xs text-gray-500 mt-2">Image Preview</p>
                  </div>
                )}
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-5 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
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
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              >
                {isLoading ? (
                  <>
                    <FaSpinner className="animate-spin" /> Saving...
                  </>
                ) : (
                  "Update Perfumer"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditPerfumer;
