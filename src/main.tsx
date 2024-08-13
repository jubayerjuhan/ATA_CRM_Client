import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";

import App from "./App.tsx";

import { Provider } from "react-redux";
import { store } from "./store/store.ts";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
    <Toaster />
  </Provider>
);
