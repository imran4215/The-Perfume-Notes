import { create } from "zustand";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const useAdminDataStore = create((set) => ({
  authors: [],
  designers: [],
  notes: [],
  perfumers: [],
  categories: [],
  stats: {
    blogs: 0,
    notes: 0,
    perfumers: 0,
    designers: 0,
    authors: 0,
  },
  loading: false,
  error: null,

  fetchDashboardData: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(
        `${BASE_URL}/api/admin/getDashboardData`
      );
      set({ stats: response.data, loading: false });
    } catch (err) {
      set({
        error: "Failed to fetch Dashboard Data. Please try again later.",
        loading: false,
      });
      console.error("Error in fetching Dashboard Data:", err);
    }
  },

  fetchAuthorData: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${BASE_URL}/api/author/getAllAuthors`);
      set({ authors: response.data.authors, loading: false });
    } catch (err) {
      console.error("Error fetching authors:", err);
      set({
        loading: false,
        error: err.message || "Failed to load authors",
      });
    }
  },
  removeAuthor: (id) =>
    set((state) => ({
      authors: state.authors.filter((author) => author._id !== id),
    })),

  fetchDesignerData: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(
        `${BASE_URL}/api/designer/getAllDesigners`
      );
      set({ designers: response.data.designers, loading: false });
    } catch (err) {
      set({
        error: "Failed to fetch Designer Data. Please try again later.",
        loading: false,
      });
      console.error("Error in fetching Designer Data:", err);
    }
  },
  removeDesigner: (id) =>
    set((state) => ({
      designers: state.designers.filter((designer) => designer._id !== id),
    })),

  fetchPerfumerData: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(
        `${BASE_URL}/api/perfumer/getAllPerfumers`
      );
      set({ perfumers: response.data.perfumers, loading: false });
    } catch (err) {
      set({
        error: "Failed to fetch Perfumer Data. Please try again later.",
        loading: false,
      });
      console.error("Error in fetching Perfumer Data:", err);
    }
  },
  removePerfumer: (id) =>
    set((state) => ({
      perfumers: state.perfumers.filter((perfumer) => perfumer._id !== id),
    })),

  fetchCategoryData: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(
        `${BASE_URL}/api/category/getAllCategories`
      );
      set({ categories: response.data.categories, loading: false });
    } catch (err) {
      set({
        error: "Failed to fetch Category Data. Please try again later.",
        loading: false,
      });
      console.error("Error in fetching Category Data:", err);
    }
  },
  removeCategory: (id) =>
    set((state) => ({
      categories: state.categories.filter((category) => category._id !== id),
    })),

  fetchNoteData: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${BASE_URL}/api/note/getAllNotes`);
      set({ notes: response.data.notes, loading: false });
    } catch (err) {
      set({
        error: "Failed to fetch notes. Please try again later.",
        loading: false,
      });
      console.error("Error in fetching notes:", err);
    }
  },
  removeNote: (id) =>
    set((state) => ({
      notes: state.notes.filter((note) => note._id !== id),
    })),
}));

export default useAdminDataStore;
