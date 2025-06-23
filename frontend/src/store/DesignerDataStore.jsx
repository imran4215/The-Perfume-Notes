import axios from "axios";
import { create } from "zustand";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const useDesignerDataStore = create((set) => ({
  designerData: [],
  loading: false,
  error: null,

  fetchDesignerData: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(
        `${BASE_URL}/api/designer/getAllDesigners`
      );
      set({ designerData: response.data.designers, loading: false });
    } catch (err) {
      set({
        error: "Failed to fetch Designer Data. Please try again later.",
        loading: false,
      });
      console.error("Error in fetching Designer Data:", err);
    }
  },
}));

export default useDesignerDataStore;
