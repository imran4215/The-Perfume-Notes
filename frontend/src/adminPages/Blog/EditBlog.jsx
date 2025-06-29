import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import JoditEditor from "jodit-react";

import useBlogDataStore from "../../store/BlogDataStore";
import useAdminDataStore from "../../store/AdminDataStore";

/* ────────────────────────────────────────────────────────── */
function EditBlog() {
  const { slug: currentSlug } = useParams(); // slug from URL
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  /* dropdown data from global store */
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

  /* blog details from global store */
  const { blogDetails, fetchBlogDetails } = useBlogDataStore();

  /* ── initial fetch on mount ───────────────────────────── */
  useEffect(() => {
    fetchBlogDetails(currentSlug);
    fetchAuthorData();
    fetchDesignerData();
    fetchPerfumerData();
    fetchNoteData();
  }, [currentSlug]);

  /* ── form state ───────────────────────────────────────── */
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    slug: "",
    releaseDate: "",
    brand: "",
    perfumer: "",
    category: "",
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
  const [accords, setAccords] = useState([
    { name: "", percentage: "", color: "#000000" },
  ]);
  const [images, setImages] = useState([null, null]);
  const [imagePreviews, setImagePreviews] = useState([null, null]);

  /* ── sync state once blog data arrives ────────────────── */
  useEffect(() => {
    if (!blogDetails?._id) return;

    setFormData({
      title: blogDetails.title || "",
      subtitle: blogDetails.subtitle || "",
      slug: blogDetails.slug || "",
      releaseDate: blogDetails.releaseDate || "",
      brand: blogDetails.brand?._id || "",
      perfumer: blogDetails.perfumer?._id || "",
      category: blogDetails.category || "",
      description1: blogDetails.description1 || "",
      description2: blogDetails.description2 || "",
      author: blogDetails.author?._id || "",
      metaTitle: blogDetails.metaTitle || "",
      metaDescription: blogDetails.metaDescription || "",
    });

    setSelectedNotes({
      top: (blogDetails.notes?.top || []).map((n) => n._id),
      middle: (blogDetails.notes?.middle || []).map((n) => n._id),
      base: (blogDetails.notes?.base || []).map((n) => n._id),
    });

    setAccords(
      blogDetails.accords?.length
        ? blogDetails.accords
        : [{ name: "", percentage: "", color: "#000000" }]
    );

    setImagePreviews([
      blogDetails.image1?.url || null,
      blogDetails.image2?.url || null,
    ]);
  }, [blogDetails]);

  /* ── years dropdown array ─────────────────────────────── */
  const years = Array.from({ length: 100 }, (_, i) => 2025 - i);

  /* ── helpers ──────────────────────────────────────────── */
  const handleChange = (e) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleNoteToggle = (type, id) =>
    setSelectedNotes((p) => ({
      ...p,
      [type]: p[type].includes(id)
        ? p[type].filter((x) => x !== id)
        : [...p[type], id],
    }));

  const [searchTerms, setSearchTerms] = useState({
    top: "",
    middle: "",
    base: "",
  });
  const handleSearchChange = (type, val) =>
    setSearchTerms((p) => ({ ...p, [type]: val.toLowerCase() }));

  const filteredNotes = (type) => {
    if (!notes) return [];
    const sorted = [...notes].sort((a, b) => a.name.localeCompare(b.name));
    return searchTerms[type]
      ? sorted.filter((n) => n.name.toLowerCase().includes(searchTerms[type]))
      : sorted;
  };

  const handleAccordChange = (i, field, val) =>
    setAccords((p) =>
      p.map((a, idx) => (idx === i ? { ...a, [field]: val } : a))
    );

  const handleAddAccord = () =>
    setAccords((p) => [...p, { name: "", percentage: "", color: "#000000" }]);

  const handleRemoveAccord = (i) =>
    accords.length > 1 && setAccords((p) => p.filter((_, idx) => idx !== i));

  const handleImageChange = (e, i) => {
    const file = e.target.files[0];
    if (!file) return;
    setImages((p) => ((p[i] = file), [...p]));
    setImagePreviews((p) => ((p[i] = URL.createObjectURL(file)), [...p]));
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      toast.error("Title is required");
      return false;
    }
    return true;
  };

  /* ── submit ───────────────────────────────────────────── */
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([k, v]) => data.append(k, v));
      data.append("notes", JSON.stringify(selectedNotes));
      data.append("accords", JSON.stringify(accords));
      images.forEach((img, idx) => img && data.append(`image${idx + 1}`, img));

      await axios.put(
        `${BASE_URL}/api/perfumeBlog/updateBlog/${currentSlug}`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success("Blog updated successfully!");
      navigate("/admin/all-blogs");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to update blog");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ── early fallback ───────────────────────────────────── */
  if (!blogDetails?._id)
    return <div className="text-center py-10 mt-[200px]">Loading…</div>;

  /* ── JSX ──────────────────────────────────────────────── */
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-14">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Edit Blog</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title / Subtitle / Slug */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Title*"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <Input
            label="Subtitle"
            name="subtitle"
            value={formData.subtitle}
            onChange={handleChange}
          />
          <Input
            label="Slug (URL)*"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            required
          />
        </div>

        {/* Release / Brand / Perfumer / Category */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Select
            label="Release Year*"
            name="releaseDate"
            value={formData.releaseDate}
            onChange={handleChange}
            options={[
              { value: "", label: "Select" },
              ...years.map((y) => ({ value: y, label: y })),
            ]}
            required
          />
          <Select
            label="Brand*"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            options={[
              { value: "", label: "Select" },
              ...(designers || []).map((d) => ({
                value: d._id,
                label: d.name,
              })),
            ]}
            required
          />
          <Select
            label="Perfumer*"
            name="perfumer"
            value={formData.perfumer}
            onChange={handleChange}
            options={[
              { value: "", label: "Select" },
              ...(perfumers || []).map((p) => ({
                value: p._id,
                label: p.name,
              })),
            ]}
            required
          />
          <Select
            label="Category*"
            name="category"
            value={formData.category}
            onChange={handleChange}
            options={[
              { value: "", label: "Select" },
              { value: "men", label: "Men" },
              { value: "women", label: "Women" },
              { value: "unisex", label: "Unisex" },
            ]}
            required
          />
        </div>

        {/* Notes */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Fragrance Notes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["top", "middle", "base"].map((type) => (
              <NoteColumn
                key={type}
                type={type}
                notes={filteredNotes(type)}
                selected={selectedNotes[type]}
                toggle={handleNoteToggle}
                searchTerm={searchTerms[type]}
                onSearchChange={(e) => handleSearchChange(type, e.target.value)}
              />
            ))}
          </div>
        </div>

        {/* Accords */}
        <AccordEditor
          accords={accords}
          change={handleAccordChange}
          add={handleAddAccord}
          remove={handleRemoveAccord}
        />

        {/* Descriptions */}
        <RichText
          label="Description 1"
          value={formData.description1}
          onChange={(html) =>
            setFormData((p) => ({ ...p, description1: html }))
          }
        />
        <RichText
          label="Description 2"
          value={formData.description2}
          onChange={(html) =>
            setFormData((p) => ({ ...p, description2: html }))
          }
        />

        {/* Meta Title / Meta Description */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Meta Title (SEO)"
            name="metaTitle"
            value={formData.metaTitle}
            onChange={handleChange}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Meta Description (SEO)
            </label>
            <textarea
              name="metaDescription"
              value={formData.metaDescription}
              onChange={handleChange}
              rows="3"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 resize-none"
            />
          </div>
        </div>

        {/* Images */}
        <ImageInput
          index={0}
          preview={imagePreviews[0]}
          change={handleImageChange}
        />
        <ImageInput
          index={1}
          preview={imagePreviews[1]}
          change={handleImageChange}
        />

        {/* Author */}
        <Select
          label="Author*"
          name="author"
          value={formData.author}
          onChange={handleChange}
          options={[
            { value: "", label: "Select" },
            ...(authors || []).map((a) => ({ value: a._id, label: a.name })),
          ]}
          required
        />

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 px-4 rounded-lg font-medium text-white ${
            isSubmitting ? "bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700"
          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition`}
        >
          {isSubmitting ? "Updating…" : "Update Blog"}
        </button>
      </form>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
 * Small reusable inputs
 * ───────────────────────────────────────────────────────── */
const Input = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      {...props}
      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
    />
  </div>
);

const Select = ({ label, options, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <select
      {...props}
      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  </div>
);

const NoteColumn = ({
  type,
  notes,
  selected,
  toggle,
  searchTerm,
  onSearchChange,
}) => (
  <div className="border rounded-lg p-3">
    <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
      {type} notes
    </label>
    <div className="mb-3">
      <input
        type="text"
        placeholder={`Search ${type} notes…`}
        value={searchTerm}
        onChange={onSearchChange}
        className="w-full p-2 border border-gray-300 rounded text-sm"
      />
    </div>
    <div className="max-h-48 overflow-y-auto space-y-2">
      {notes.map((n) => (
        <div key={n._id} className="flex items-center">
          <input
            type="checkbox"
            id={`${type}-${n._id}`}
            checked={selected.includes(n._id)}
            onChange={() => toggle(type, n._id)}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label
            htmlFor={`${type}-${n._id}`}
            className="ml-2 text-sm text-gray-700"
          >
            {n.name}
          </label>
        </div>
      ))}
    </div>
  </div>
);

const AccordEditor = ({ accords, change, add, remove }) => (
  <div>
    <h3 className="text-lg font-semibold text-gray-800 mb-2">Accords</h3>
    {accords.map((a, i) => (
      <div
        key={i}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3 items-end"
      >
        <Input
          label="Name"
          value={a.name}
          onChange={(e) => change(i, "name", e.target.value)}
        />
        <Input
          label="Percentage"
          type="number"
          value={a.percentage}
          onChange={(e) => change(i, "percentage", e.target.value)}
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Color
          </label>
          <div className="flex items-center space-x-3">
            <input
              type="text"
              value={a.color}
              onChange={(e) => change(i, "color", e.target.value)}
              className="w-24 px-2 py-1 border border-gray-300 rounded text-sm font-mono"
            />
            <input
              type="color"
              value={a.color}
              onChange={(e) => change(i, "color", e.target.value)}
              className="h-10 w-10 rounded border"
            />
          </div>
        </div>
        {accords.length > 1 && (
          <button
            type="button"
            onClick={() => remove(i)}
            className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition"
          >
            Remove
          </button>
        )}
      </div>
    ))}
    <button
      type="button"
      onClick={add}
      className="mt-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition"
    >
      + Add Another Accord
    </button>
  </div>
);

const RichText = ({ label, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <JoditEditor
      ref={useRef(null)}
      value={value}
      onChange={onChange}
      className="border border-gray-300 rounded-lg overflow-hidden"
    />
  </div>
);

const ImageInput = ({ index, preview, change }) => (
  <div className="border rounded-lg p-4">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Image {index + 1}
    </label>
    <input
      type="file"
      accept="image/*"
      onChange={(e) => change(e, index)}
      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
    />
    {preview && (
      <img
        src={preview}
        alt={`Preview ${index + 1}`}
        className="mt-3 w-full h-48 object-contain rounded border"
      />
    )}
  </div>
);

export default EditBlog;
