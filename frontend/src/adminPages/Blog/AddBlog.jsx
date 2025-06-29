import React, { useState, useRef, useEffect } from "react";
import useAdminDataStore from "../../store/AdminDataStore";
import JoditEditor from "jodit-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AddBlog() {
  const editor = useRef(null);
  const {
    designers,
    perfumers,
    notes,
    authors,
    fetchAuthorData,
    fetchDesignerData,
    fetchPerfumerData,
    fetchNoteData,
  } = useAdminDataStore();

  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  /* ───────────────────────────────────────────────
     INITIAL DATA FETCH
  ─────────────────────────────────────────────── */
  useEffect(() => {
    fetchAuthorData();
    fetchDesignerData();
    fetchPerfumerData();
    fetchNoteData();
  }, []);

  /* ───────────────────────────────────────────────
     STATE
  ─────────────────────────────────────────────── */
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    slug: "",
    releaseDate: "",
    brand: "",
    perfumer: "",
    category: "", // men | women | unisex
    description1: "",
    description2: "",
    author: "",
    metaTitle: "",
    metaDescription: "",
  });

  const [selectedNotes, setSelectedNotes] = useState({
    top: [],
    middle: [],
    base: [],
  });

  const [searchTerms, setSearchTerms] = useState({
    top: "",
    middle: "",
    base: "",
  });

  const [accords, setAccords] = useState([
    { name: "", percentage: "", color: "#000000" },
  ]);

  const [images, setImages] = useState([null, null]);
  const [imagePreviews, setImagePreviews] = useState([null, null]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const years = Array.from({ length: 100 }, (_, i) => 2025 - i);

  /* ───────────────────────────────────────────────
     HANDLERS
  ─────────────────────────────────────────────── */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNoteToggle = (noteType, noteId) => {
    setSelectedNotes((prev) => ({
      ...prev,
      [noteType]: prev[noteType].includes(noteId)
        ? prev[noteType].filter((id) => id !== noteId)
        : [...prev[noteType], noteId],
    }));
  };

  const handleSearchChange = (noteType, value) => {
    setSearchTerms((prev) => ({ ...prev, [noteType]: value.toLowerCase() }));
  };

  const filteredNotes = (noteType) => {
    if (!notes) return [];
    const sortedNotes = [...notes].sort((a, b) => a.name.localeCompare(b.name));
    if (!searchTerms[noteType]) return sortedNotes;
    return sortedNotes.filter((note) =>
      note.name.toLowerCase().includes(searchTerms[noteType])
    );
  };

  const handleAccordChange = (index, field, value) => {
    const updated = [...accords];
    updated[index][field] = value;
    setAccords(updated);
  };

  const handleAddAccord = () => {
    setAccords([...accords, { name: "", percentage: "", color: "#000000" }]);
  };

  const handleRemoveAccord = (index) => {
    if (accords.length > 1) {
      setAccords(accords.filter((_, i) => i !== index));
    }
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;
    const newImages = [...images];
    const newPreviews = [...imagePreviews];
    newImages[index] = file;
    newPreviews[index] = URL.createObjectURL(file);
    setImages(newImages);
    setImagePreviews(newPreviews);
  };

  /* ───────────────────────────────────────────────
     VALIDATION
  ─────────────────────────────────────────────── */
  const validateForm = () => {
    const required = [
      "title",
      "slug",
      "releaseDate",
      "brand",
      "perfumer",
      "category",
      "description1",
      "description2",
      "author",
      "metaTitle",
      "metaDescription",
    ];
    const missing = required.find((field) => !formData[field]);
    if (missing) {
      toast.error("Please fill all required fields");
      return false;
    }
    return true;
  };

  /* ───────────────────────────────────────────────
     SUBMIT
  ─────────────────────────────────────────────── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) =>
        data.append(key, value)
      );
      data.append("notes", JSON.stringify(selectedNotes));
      data.append("accords", JSON.stringify(accords));
      images.forEach((img, idx) => img && data.append(`image${idx + 1}`, img));

      await axios.post(`${BASE_URL}/api/perfumeBlog/addBlog`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Blog added successfully!");
      navigate("/admin/all-blogs");
    } catch (err) {
      console.error("Error submitting blog:", err);
      toast.error(err.response?.data?.message || "Failed to add blog");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ───────────────────────────────────────────────
     UI
  ─────────────────────────────────────────────── */
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-14">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Add New Blog</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title, Subtitle, Slug */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title*
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Blog title"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subtitle
            </label>
            <input
              type="text"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              placeholder="Blog subtitle"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Slug* (unique URL)
            </label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              placeholder="e.g. sauvage-dior-review"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
        </div>

        {/* Release Year, Brand, Perfumer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Release Year*
            </label>
            <select
              name="releaseDate"
              value={formData.releaseDate}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="">Select Year</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Brand*
            </label>
            <select
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="">Select Brand</option>
              {designers?.map((d) => (
                <option key={d._id} value={d._id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Perfumer*
            </label>
            <select
              name="perfumer"
              value={formData.perfumer}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="">Select Perfumer</option>
              {perfumers?.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category*
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="">Select Category</option>
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="unisex">Unisex</option>
            </select>
          </div>
        </div>

        {/* Notes */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Fragrance Notes*
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["top", "middle", "base"].map((noteType) => (
              <div key={noteType} className="border rounded-lg p-3">
                <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                  {noteType} Notes
                </label>

                {/* Search input for each note type */}
                <div className="mb-3">
                  <input
                    type="text"
                    placeholder={`Search ${noteType} notes...`}
                    value={searchTerms[noteType]}
                    onChange={(e) =>
                      handleSearchChange(noteType, e.target.value)
                    }
                    className="w-full p-2 border border-gray-300 rounded text-sm"
                  />
                </div>

                <div className="max-h-48 overflow-y-auto space-y-2">
                  {filteredNotes(noteType)?.map((note) => (
                    <div key={note._id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`${noteType}-${note._id}`}
                        checked={selectedNotes[noteType].includes(note._id)}
                        onChange={() => handleNoteToggle(noteType, note._id)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor={`${noteType}-${note._id}`}
                        className="ml-2 text-sm text-gray-700"
                      >
                        {note.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Accords */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Accords</h3>
          {accords.map((accord, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3 items-end"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={accord.name}
                  onChange={(e) =>
                    handleAccordChange(index, "name", e.target.value)
                  }
                  placeholder="Accord name"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Percentage
                </label>
                <input
                  type="number"
                  value={accord.percentage}
                  onChange={(e) =>
                    handleAccordChange(index, "percentage", e.target.value)
                  }
                  placeholder="0-100"
                  min="0"
                  max="100"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Color
                </label>
                <div className="flex items-center space-x-3">
                  {/* Hex Code Input */}
                  <input
                    type="text"
                    value={accord.color}
                    onChange={(e) =>
                      handleAccordChange(index, "color", e.target.value)
                    }
                    className="w-24 px-2 py-1 border border-gray-300 rounded text-sm font-mono"
                    placeholder="#FFFFFF"
                  />

                  {/* Color Picker Input */}
                  <input
                    type="color"
                    value={accord.color}
                    onChange={(e) =>
                      handleAccordChange(index, "color", e.target.value)
                    }
                    className="h-10 w-10 rounded border border-gray-300 cursor-pointer"
                  />
                </div>
              </div>

              <div>
                {accords.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveAccord(index)}
                    className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddAccord}
            className="mt-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition"
          >
            + Add Another Accord
          </button>
        </div>

        {/* Descriptions */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description 1*
            </label>
            <JoditEditor
              ref={editor}
              value={formData.description1}
              onChange={(content) =>
                setFormData((prev) => ({ ...prev, description1: content }))
              }
              className="border border-gray-300 rounded-lg overflow-hidden"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description 2*
            </label>
            <JoditEditor
              ref={editor}
              value={formData.description2}
              onChange={(content) =>
                setFormData((prev) => ({ ...prev, description2: content }))
              }
              className="border border-gray-300 rounded-lg overflow-hidden"
            />
          </div>
        </div>

        {/* Images */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Images*</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[0, 1].map((index) => (
              <div key={index} className="border rounded-lg p-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image {index + 1}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, index)}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                />
                {imagePreviews[index] && (
                  <div className="mt-3">
                    <img
                      src={imagePreviews[index]}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-48 object-contain rounded border"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Author */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Author*
            </label>
            <select
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            >
              <option value="">Select Author</option>
              {authors?.map((a) => (
                <option key={a._id} value={a._id}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Meta Title & Meta Description */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Meta Title* (SEO)
            </label>
            <input
              type="text"
              name="metaTitle"
              value={formData.metaTitle}
              onChange={handleChange}
              placeholder="Max ~60 characters"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Meta Description* (SEO)
            </label>
            <textarea
              name="metaDescription"
              value={formData.metaDescription}
              onChange={handleChange}
              rows="3"
              placeholder="A concise summary for search engines (max ~160 characters)"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 resize-none"
              required
            ></textarea>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 rounded-lg font-medium text-white ${
              isSubmitting
                ? "bg-indigo-400"
                : "bg-indigo-600 hover:bg-indigo-700"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition`}
          >
            {isSubmitting ? "Submitting..." : "Submit Blog"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddBlog;
