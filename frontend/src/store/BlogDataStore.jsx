import axios from "axios";
import { create } from "zustand";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const useBlogDataStore = create((set) => ({
  blogData: [],
  blogDetails: null,
  loading: false,
  error: null,

  fetchBlogData: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(
        `${BASE_URL}/api/perfumeBlog/getAllBlogs`
      );
      set({ blogData: response.data.Blogs, loading: false });
    } catch (err) {
      set({
        error: "Failed to fetch blogs. Please try again later.",
        loading: false,
      });
      console.error("Error in fetching blogs:", err);
    }
  },

  fetchBlogDetails: async (slug) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(
        `${BASE_URL}/api/perfumeBlog/getBlogBySlug/${slug}`
      );
      set({ blogDetails: response.data.blog, loading: false });
    } catch (err) {
      set({
        error: "Failed to fetch blog details. Please try again later.",
        loading: false,
      });
      console.error("Error in fetching blog details:", err);
    }
  },

  removeBlog: (id) =>
    set((state) => ({
      blogData: state.blogData.filter((blog) => blog._id !== id),
    })),
}));

export default useBlogDataStore;
