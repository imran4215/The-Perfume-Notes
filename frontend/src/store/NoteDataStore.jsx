import axios from "axios";
import { create } from "zustand";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const useNoteDataStore = create((set) => ({
  noteData: [],
  noteDetailsData: null,
  loading: false,
  error: null,

  fetchNoteData: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${BASE_URL}/api/note/getAllNotes`);
      set({ noteData: response.data.notes, loading: false });
    } catch (err) {
      set({
        error: "Failed to fetch notes. Please try again later.",
        loading: false,
      });
      console.error("Error in fetching notes:", err);
    }
  },

  fetchNoteDetailsData: async (slug) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(
        `${BASE_URL}/api/note/getNoteBySlug/${slug}`
      );
      set({
        noteDetailsData: response.data.note,
        loading: false,
      });
    } catch (err) {
      set({
        error: "Failed to fetch note details. Please try again later.",
        loading: false,
      });
      console.error("Error in fetching note details:", err);
    }
  },
}));

export default useNoteDataStore;
