import { configureStore } from "@reduxjs/toolkit";
import animeReducer from "../Slices/animeSlice";

const store = configureStore({
  reducer: { animeReducer },
});

export default store;
