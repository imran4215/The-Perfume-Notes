import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAdminDataStore from "../../store/AdminDataStore";
import JoditEditor from "jodit-react";
import { toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa";
import useNoteDataStore from "../../store/NoteDataStore";
import Loading from "../../componenets/Loading";
import Error404 from "../../componenets/Error404";
import PageNotFound from "../../pages/PageNotFound";

function EditNote() {
  const editor = useRef(null);
  const navigate = useNavigate();
  const { categories, fetchCategoryData } = useAdminDataStore();
  const { id, slug } = useParams();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const {
    noteDetailsData,
    fetchNoteDetailsData,
    loading: noteLoading,
    error: noteError,
  } = useNoteDataStore();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    details: "",
    profilePic: null,
    coverPic: null,
    metaTitle: "",
    metaDescription: "",
  });

  const [previewProfilePic, setPreviewProfilePic] = useState(null);
  const [previewCoverPic, setPreviewCoverPic] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchNoteDetailsData(slug);
    fetchCategoryData();
  }, [slug]);

  useEffect(() => {
    if (noteDetailsData) {
      setFormData({
        name: noteDetailsData.name || "",
        category:
          noteDetailsData.category?._id || noteDetailsData.category || "",
        details: noteDetailsData.details || "",
        profilePic: null,
        coverPic: null,
        metaTitle: noteDetailsData.metaTitle || "",
        metaDescription: noteDetailsData.metaDescription || "",
      });
      setPreviewProfilePic(noteDetailsData.profilePic?.url || null);
      setPreviewCoverPic(noteDetailsData.coverPic?.url || null);
    }
  }, [noteDetailsData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));

      const reader = new FileReader();
      reader.onloadend = () => {
        if (name === "profilePic") setPreviewProfilePic(reader.result);
        else if (name === "coverPic") setPreviewCoverPic(reader.result);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.category.trim() ||
      !formData.metaTitle.trim() ||
      !formData.metaDescription.trim()
    ) {
      toast.error(
        "Name, Category, Meta Title, and Meta Description are required."
      );
      return;
    }

    setLoading(true);

    const submitData = new FormData();
    submitData.append("name", formData.name.trim());
    submitData.append("category", formData.category.trim());
    submitData.append("details", formData.details || "");
    submitData.append("metaTitle", formData.metaTitle.trim());
    submitData.append("metaDescription", formData.metaDescription.trim());
    if (formData.profilePic)
      submitData.append("profilePic", formData.profilePic);
    if (formData.coverPic) submitData.append("coverPic", formData.coverPic);

    try {
      const response = await fetch(`${BASE_URL}/api/note/updateNote/${id}`, {
        method: "PUT",
        body: submitData,
      });

      if (response.ok) {
        toast.success("Note updated successfully!");
        setTimeout(() => navigate("/admin/all-notes"), 1500);
      } else {
        throw new Error("Failed to update note");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (noteLoading) {
    return <Loading />;
  }

  if (noteError) {
    return <Error404 error={noteError} />;
  }

  if (!noteDetailsData) {
    return <PageNotFound />;
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100 mt-16 flex justify-center items-start">
      <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-5xl">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 mb-6 transition-colors"
        >
          <FaArrowLeft /> Back to Notes
        </button>

        <h1 className="text-3xl font-bold mb-6 text-gray-800">Edit Note</h1>

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
              {previewProfilePic && (
                <img
                  src={previewProfilePic}
                  alt="Profile Preview"
                  className="w-32 h-32 object-cover rounded-md shadow border border-gray-300"
                />
              )}
            </div>
          </div>

          {/* Cover Pic Upload with Preview */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Cover Picture (Optional)
            </label>
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
              <input
                type="file"
                name="coverPic"
                accept="image/*"
                onChange={handleFileChange}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/2"
              />
              {previewCoverPic && (
                <img
                  src={previewCoverPic}
                  alt="Cover Preview"
                  className="w-32 h-32 object-cover rounded-md shadow border border-gray-300"
                />
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 text-white rounded-lg font-semibold transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "Updating..." : "Update Note"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditNote;
