// src/store.js
import { create } from "zustand";

const useApiStore = create((set,get) => ({
  apiData: null, // store the data returned by the API call in this array
   // filter the apiData based on user input
  // store the selected variant code{normal=FE0F,light skin tone = 1F3FB, med light skin tone = 1F3FC, med skin tone=1F3FD, med dark tone= 1F3FE, dark tone= 1F3FF}
  loading: true,
  error: null,
  fetchApiData: async () => {
    try {
      const response = await fetch(
        "https://emoji-api.com/emojis?access_key=3efe76ea8a81051864386ea51a1ecea0ccac1849"
      );
      const data = await response.json();
      set({ apiData: data });
      set({ loading: false });
      console.log(data);
    } catch (err) {
      set({ error: err });
    }
  },
  
}));

export default useApiStore;
