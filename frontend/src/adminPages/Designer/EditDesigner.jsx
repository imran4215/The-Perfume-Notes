import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaUpload, FaSpinner } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import JoditEditor from "jodit-react";
import useDesignerDataStore from "../../store/DesignerDataStore";
import Loading from "../../componenets/Loading";
import Error404 from "../../componenets/Error404";
import PageNotFound from "../../pages/PageNotFound";

function EditDesigner() {
  const { slug } = useParams();
  const { designerDetailsData, fetchDesignerDetailsData, loading, error } =
    useDesignerDataStore();

  const editor = useRef(null);
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    metaTitle: "",
    metaDescription: "",
    logo: null,
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchDesignerDetailsData(slug);
  }, [slug]);

  useEffect(() => {
    if (designerDetailsData) {
      setFormData({
        name: designerDetailsData.name || "",
        description: designerDetailsData.description || "",
        metaTitle: designerDetailsData.metaTitle || "",
        metaDescription: designerDetailsData.metaDescription || "",
        logo: null,
      });
      setPreviewImage(designerDetailsData.logo?.url || null);
    }
  }, [designerDetailsData]);

  if (loading) return <Loading />;
  if (error) return <Error404 error={error} />;
  if (!designerDetailsData) return <PageNotFound />;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, logo: file }));
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
      formDataToSend.append("description", formData.description);
      formDataToSend.append("metaTitle", formData.metaTitle);
      formDataToSend.append("metaDescription", formData.metaDescription);
      if (formData.logo) formDataToSend.append("logo", formData.logo);

      await axios.put(
        `${BASE_URL}/api/designer/updateDesigner/${slug}`,
        formDataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      toast.success("Designer updated successfully! Redirecting...");
      setTimeout(() => navigate("/admin/all-designers"), 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update designer.", {
        position: "top-right",
        autoClose: 3000,
      });
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
          <FaArrowLeft /> Back to Designers
        </button>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 py-5 px-6">
            <h1 className="text-2xl font-bold text-white">Edit Designer</h1>
            <p className="text-indigo-100 mt-1">
              Modify the details below to update this designer's profile
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Designer Name*
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

            {/* Description */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Description*
              </label>
              <JoditEditor
                ref={editor}
                value={formData.description}
                onChange={(newContent) =>
                  setFormData((prev) => ({ ...prev, description: newContent }))
                }
              />
            </div>

            {/* Meta Title */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Meta Title*
              </label>
              <input
                type="text"
                name="metaTitle"
                value={formData.metaTitle}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Meta Description */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Meta Description*
              </label>
              <textarea
                name="metaDescription"
                value={formData.metaDescription}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Logo Upload */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Logo
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

            {/* Buttons */}
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
                  "Update Designer"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditDesigner;
