import { configureStore, combineReducers } from "@reduxjs/toolkit";
import appointmentList from "./slices/appointmentSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

const reducer = combineReducers({
  appointments: appointmentList,
});

// const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer,
});

export default store;
