import React, { useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import JoditEditor from "jodit-react";
import { useNavigate } from "react-router-dom";

function AddPerfumer() {
  const editor = useRef(null);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [intro, setIntro] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !title || !intro || !bio || !image) {
      toast.error("All fields including image are required");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("title", title);
    formData.append("intro", intro);
    formData.append("bio", bio);
    formData.append("image", image);

    setLoading(true);
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/perfumer/addPerfumer`,
        formData
      );
      toast.success("Perfumer added successfully!");
      navigate("/admin/all-perfumers");
      setName("");
      setTitle("");
      setIntro("");
      setBio("");
      setImage(null);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-start  bg-gray-100 px-4 mt-18">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Add New Perfumer
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-gray-700 font-semibold mb-2"
            >
              Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter perfumer's full name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              disabled={loading}
            />
          </div>

          <div>
            <label
              htmlFor="title"
              className="block text-gray-700 font-semibold mb-2"
            >
              Title <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Master Perfumer"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              disabled={loading}
            />
          </div>

          <div>
            <label
              htmlFor="intro"
              className="block text-gray-700 font-semibold mb-2"
            >
              Introduction <span className="text-red-500">*</span>
            </label>
            <textarea
              id="intro"
              rows="2"
              value={intro}
              onChange={(e) => setIntro(e.target.value)}
              placeholder="Write a short introduction"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              disabled={loading}
            />
          </div>

          <div>
            <label
              htmlFor="bio"
              className="block text-gray-700 font-semibold mb-2"
            >
              Biography <span className="text-red-500">*</span>
            </label>
            <JoditEditor
              ref={editor}
              value={bio}
              onChange={(newContent) => setBio(newContent)}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Profile Image <span className="text-red-500">*</span>
            </label>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              {image ? (
                <div className="flex flex-col items-center gap-4">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Preview"
                    className="w-40 h-40 object-cover rounded-lg shadow"
                  />
                  <button
                    type="button"
                    onClick={() => setImage(null)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Remove Image
                  </button>
                </div>
              ) : (
                <label className="block cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="hidden"
                    disabled={loading}
                  />
                  <span className="text-gray-500">
                    Click to upload or drag image here
                  </span>
                </label>
              )}
            </div>
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
            {loading ? "Submitting..." : "Add Perfumer"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddPerfumer;
