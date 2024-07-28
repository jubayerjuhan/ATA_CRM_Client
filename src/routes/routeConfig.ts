// src/routes/routeConfig.ts
import Home from "../pages/Home";

interface RouteConfig {
  path: string;
  component: React.ComponentType;
  exact?: boolean;
  isPrivate?: boolean;
}

const routes: RouteConfig[] = [
  {
    path: "/",
    component: Home,
    exact: true,
  },
];

export default routes;
