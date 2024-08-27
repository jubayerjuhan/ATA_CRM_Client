import "./App.css";
import AppRoutes from "./routes/AppRoutes";

function App() {
  console.log(import.meta.env.NODE_ENV, "NODE_ENV");
  return <AppRoutes />;
}

export default App;
