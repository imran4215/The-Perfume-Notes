import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const useBlogDataStore = create(
  persist(
    (set) => ({
      blogData: [],
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
      removeBlog: (id) =>
        set((state) => ({
          blogData: state.blogData.filter((blog) => blog._id !== id),
        })),
    }),
    {
      name: "blog-data-storage", // localStorage e key hobe
      getStorage: () => localStorage, // default, explicitly set korlam
      // optionally you can whitelist what state you want to persist
      partialize: (state) => ({ blogData: state.blogData }),
    }
  )
);

export default useBlogDataStore;
