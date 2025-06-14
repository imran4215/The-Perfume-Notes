import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import JoditEditor from "jodit-react";

import useBlogDataStore from "../../store/BlogDataStore";
import useAdminDataStore from "../../store/AdminDataStore";

function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const editor = useRef(null);
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  /* ───────────────── fetch dropdown data ───────────────── */
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

  useEffect(() => {
    fetchAuthorData();
    fetchDesignerData();
    fetchPerfumerData();
    fetchNoteData();
  }, []);

  /* ───────────────── current blog (may be undefined) ───── */
  const { blogData } = useBlogDataStore();
  const blog = blogData.find((b) => b._id === id);

  /* ───────────────── local state, all with safe defaults ─ */
  const [formData, setFormData] = useState({
    title: blog?.title || "",
    subtitle: blog?.subtitle || "",
    releaseDate: blog?.releaseDate || "",
    brand: blog?.brand?._id || "",
    perfumer: blog?.perfumer?._id || "",
    description1: blog?.description1 || "",
    description2: blog?.description2 || "",
    author: blog?.author?._id || "",
  });

  const [selectedNotes, setSelectedNotes] = useState({
    top: blog?.notes?.top?.map((n) => n._id) || [],
    middle: blog?.notes?.middle?.map((n) => n._id) || [],
    base: blog?.notes?.base?.map((n) => n._id) || [],
  });

  const [accords, setAccords] = useState(
    blog?.accords?.length
      ? blog.accords
      : [{ name: "", percentage: "", color: "#000000" }]
  );

  /* images that user might replace */
  const [images, setImages] = useState([null, null]);
  const [imagePreviews, setImagePreviews] = useState([
    blog?.image1?.url || null,
    blog?.image2?.url || null,
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  /* years for dropdown */
  const years = Array.from({ length: 100 }, (_, i) => 2025 - i);

  /* ───────────────── helpers ───────────────────────────── */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNoteToggle = (type, noteId) => {
    setSelectedNotes((prev) => ({
      ...prev,
      [type]: prev[type].includes(noteId)
        ? prev[type].filter((id) => id !== noteId)
        : [...prev[type], noteId],
    }));
  };

  const handleAccordChange = (idx, field, value) => {
    const updated = [...accords];
    updated[idx][field] = value;
    setAccords(updated);
  };

  const handleAddAccord = () =>
    setAccords((prev) => [
      ...prev,
      { name: "", percentage: "", color: "#000000" },
    ]);

  const handleRemoveAccord = (idx) =>
    accords.length > 1 &&
    setAccords((prev) => prev.filter((_, i) => i !== idx));

  const handleImageChange = (e, idx) => {
    const file = e.target.files[0];
    if (!file) return;
    const newImgs = [...images];
    const newPrev = [...imagePreviews];
    newImgs[idx] = file;
    newPrev[idx] = URL.createObjectURL(file);
    setImages(newImgs);
    setImagePreviews(newPrev);
  };

  /* Very light validation – only Title is mandatory */
  const validateForm = () => {
    if (!formData.title.trim()) {
      toast.error("Title is required");
      return false;
    }
    return true;
  };

  /* ───────────────── form submit ───────────────────────── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const data = new FormData();
      /* append scalars */
      Object.entries(formData).forEach(([k, v]) => data.append(k, v));
      /* append JSON strings */
      data.append("accords", JSON.stringify(accords));
      data.append("notes", JSON.stringify(selectedNotes));
      /* append only the images user changed */
      images.forEach((img, idx) => img && data.append(`image${idx + 1}`, img));

      await axios.put(`${BASE_URL}/api/perfumeBlog/updateBlog/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Blog updated successfully!");
      navigate("/admin/all-blogs");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to update blog");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ───────────────── loader / 404 ──────────────────────── */
  if (!blog) return <div className="text-center py-10">Blog not found</div>;

  /* ───────────────── view ──────────────────────────────── */
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-14">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Edit Blog</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ─── Title & Subtitle ─────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        </div>

        {/* ─── Release Year / Brand / Perfumer ─────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Release Year */}
          <Select
            label="Release Year"
            name="releaseDate"
            value={formData.releaseDate}
            onChange={handleChange}
            options={[
              { value: "", label: "Select Year" },
              ...years.map((y) => ({ value: y, label: y })),
            ]}
          />
          {/* Brand */}
          <Select
            label="Brand"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            options={[
              { value: "", label: "Select Brand" },
              ...designers.map((d) => ({ value: d._id, label: d.name })),
            ]}
          />
          {/* Perfumer */}
          <Select
            label="Perfumer"
            name="perfumer"
            value={formData.perfumer}
            onChange={handleChange}
            options={[
              { value: "", label: "Select Perfumer" },
              ...perfumers.map((p) => ({ value: p._id, label: p.name })),
            ]}
          />
        </div>

        {/* ─── Notes ───────────────────────────────────── */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Fragrance Notes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["top", "middle", "base"].map((type) => (
              <NoteColumn
                key={type}
                type={type}
                notes={notes}
                selected={selectedNotes[type]}
                toggle={handleNoteToggle}
              />
            ))}
          </div>
        </div>

        {/* ─── Accords ────────────────────────────────── */}
        <AccordEditor
          accords={accords}
          change={handleAccordChange}
          add={handleAddAccord}
          remove={handleRemoveAccord}
        />

        {/* ─── Descriptions ───────────────────────────── */}
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

        {/* ─── Images ─────────────────────────────────── */}
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

        {/* ─── Author ─────────────────────────────────── */}
        <Select
          label="Author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          options={[
            { value: "", label: "Select Author" },
            ...authors.map((a) => ({ value: a._id, label: a.name })),
          ]}
        />

        {/* ─── Submit ─────────────────────────────────── */}
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

/* -------------------------------------------------------------------
 * Small presentational helpers
 * -----------------------------------------------------------------*/
const Input = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      {...props}
    />
  </div>
);

const Select = ({ label, options = [], ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <select
      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      {...props}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

const NoteColumn = ({ type, notes, selected, toggle }) => (
  <div className="border rounded-lg p-3">
    <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
      {type} Notes
    </label>
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
    {accords.map((a, idx) => (
      <div
        key={idx}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3 items-end"
      >
        <Input
          label="Name"
          value={a.name}
          onChange={(e) => change(idx, "name", e.target.value)}
        />
        <Input
          label="Percentage"
          type="number"
          min="0"
          max="100"
          value={a.percentage}
          onChange={(e) => change(idx, "percentage", e.target.value)}
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Color
          </label>
          <div className="flex items-center">
            <input
              type="color"
              value={a.color}
              onChange={(e) => change(idx, "color", e.target.value)}
              className="h-10 w-10 rounded border border-gray-300"
            />
            <span className="ml-2 text-sm">{a.color}</span>
          </div>
        </div>
        {accords.length > 1 && (
          <button
            type="button"
            onClick={() => remove(idx)}
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
      + Add Another Accord
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
      <div className="mt-3">
        <img
          src={preview}
          alt={`Preview ${index + 1}`}
          className="w-full h-48 object-contain rounded border"
        />
      </div>
    )}
  </div>
);

export default EditBlog;
