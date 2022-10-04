import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import dataReducer from "./dataSlice";
const store = configureStore({
  reducer: { data: dataReducer, auth: authReducer },
});

export default store;
