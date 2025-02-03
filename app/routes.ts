import { type RouteConfig, index } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  {
    path: "game",
    file: "routes/game.tsx",
  },
] satisfies RouteConfig;