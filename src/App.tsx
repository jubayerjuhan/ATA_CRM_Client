import "./App.css";
import AppRoutes from "./routes/AppRoutes";

function App() {
  console.log(import.meta.env.VITE_NODE_ENV, "NODE_ENV");
  return <AppRoutes />;
}

export default App;
