import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const usePerfumerDataStore = create(
  persist(
    (set) => ({
      perfumerData: [],
      loading: false,
      error: null,

      fetchPerfumerData: async () => {
        set({ loading: true, error: null });
        try {
          const response = await axios.get(
            `${BASE_URL}/api/perfumer/getAllPerfumers`
          );
          set({ perfumerData: response.data.perfumers, loading: false });
        } catch (err) {
          set({
            error: "Failed to fetch Perfumer Data. Please try again later.",
            loading: false,
          });
          console.error("Error in fetching Perfumer Data:", err);
        }
      },
    }),
    {
      name: "perfumer-data-storage", // localStorage e key hobe
      getStorage: () => localStorage, // default, explicitly set korlam
      // optionally you can whitelist what state you want to persist
      partialize: (state) => ({ perfumerData: state.perfumerData }),
    }
  )
);

export default usePerfumerDataStore;
