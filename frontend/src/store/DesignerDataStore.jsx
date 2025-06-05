import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const useDesignerDataStore = create(
  persist(
    (set) => ({
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
    }),
    {
      name: "designer-data-storage", // localStorage e key hobe
      getStorage: () => localStorage, // default, explicitly set korlam
      // optionally you can whitelist what state you want to persist
      partialize: (state) => ({ designerData: state.designerData }),
    }
  )
);

export default useDesignerDataStore;
