import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import { homeRouter } from "./home";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: {
      name: "Home.Main",
    },
  },
  ...homeRouter,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
