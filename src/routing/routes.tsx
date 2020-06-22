import Home from "../pages/home";
import FilterMap from "../pages/map";

export const routes = [
  {
    path: "/",
    private: false,
    component: Home,
    exact: true,
    main_nav_label: "Home"
  },
  {
    path: "/map",
    private: false,
    component: FilterMap,
    exact: true,
    main_nav_label: "Filter Map"
  }
];
