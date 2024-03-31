// src/store.js
import { create } from "zustand";

const useApiStore = create((set) => ({
  apiData: null, // store the data returned by the API call in this array
  variant: {
    normal: "FE0F",
    lightSkinTone: "1F3FB",
    mediumLightSkinTone: "1F3FC",
    mediumSkinTone:'1F3FD',
    mediumDarkSkinTone: '1F3FE',
    darkSkinTone:'1F3FF'
  }, // store the selected variant code{normal=FE0F,light skin tone = 1F3FB, med light skin tone = 1F3FC, med skin tone=1F3FD, med dark tone= 1F3FE, dark tone= 1F3FF}
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
  getfilteredEmojis: (state) => {
    const data = state.apiData.filter((item) => {
      return !item.codePoint.includes(state.variant.toUpperCase(), 5);
    });
  },
}));

export default useApiStore;
