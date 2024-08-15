import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { PersistGate } from "redux-persist/integration/react";

import App from "./App.tsx";

import { Provider } from "react-redux";
import { persistor, store } from "./store/store.ts";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
      <Toaster />
    </PersistGate>
  </Provider>
);
