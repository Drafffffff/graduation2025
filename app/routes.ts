import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("cot", "routes/cot.tsx"),
  route("cmf", "routes/cmf.tsx"),
  route("col", "routes/col.tsx"),
  route("vec", "routes/vec.tsx"),
  route("lay", "routes/lay.tsx"),

] satisfies RouteConfig;
