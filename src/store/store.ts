import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import { authReducer, leadReducer, userReducer } from "../redux/reducers";
import { thunk } from "redux-thunk";

// Configuration for redux-persist
const persistConfig = {
  key: "root", // key for the persisted state
  storage, // storage mechanism (localStorage in this case)
  whitelist: ["auth"], // persist both auth and user states
};

// Combine all reducers into a rootReducer
const rootReducer = {
  auth: authReducer,
  user: userReducer,
  lead: leadReducer,
};

// Apply persistReducer to the rootReducer
const persistedReducer = persistReducer(
  persistConfig,
  combineReducers(rootReducer)
);

// Configure the store
export const store = configureStore({
  reducer: persistedReducer, // use the persisted rootReducer
});

// Persistor for the store
export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
