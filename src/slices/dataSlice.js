import { createSlice } from "@reduxjs/toolkit";

export const dataSlice = createSlice({
  name: "data",
  initialState: {
    loading: true,
    dragons: null,
    favourites: JSON.parse(localStorage.getItem("fav-dragons")) || [],
  },
  reducers: {
    dataRequest: (state) => {
      state.loading = true;
    },
    dataSuccess: (state, action) => {
      state.loading = false;
      state.dragons = action.payload;
    },
    addToFav: (state, action) => {
      state.favourites.push(action.payload);
      localStorage.setItem("fav-dragons", JSON.stringify(state.favourites));
    },
    removeFromFav: (state, action) => {
      state.favourites = state.favourites.filter(
        (f) => f.id !== action.payload.id
      );
      localStorage.setItem("fav-dragons", JSON.stringify(state.favourites));
    },
  },
});

export const { addToFav, removeFromFav, dataSuccess, dataRequest } =
  dataSlice.actions;
export default dataSlice.reducer;
