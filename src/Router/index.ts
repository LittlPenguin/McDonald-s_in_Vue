import { createWebHistory, createRouter } from "vue-router";

import Layout from "@/pages/Layout/index.vue";
import Main from "@/pages/Layout/modules/main.vue";
import Menu from "@/pages/Menu/index.vue";
import Offers from "@/pages/Offers/index.vue";
import car from "@/pages/Car/index.vue";
import Buy from "@/pages/Buy/index.vue";
import Login from "@/pages/Login/index.vue";

const routes = [
  {
    path: "/",
    component: Layout,
    children: [
      { path: "/", component: Main },
      { path: "/menu", component: Menu },
      { path: "/offers", component: Offers },
      { path: "/car", component: car },
      { path: "/buy/:goodsId", component: Buy },
      { path: "/login", component: Login },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
